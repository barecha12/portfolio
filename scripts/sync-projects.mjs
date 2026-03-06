#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

const DEFAULT_USERNAME = process.env.GITHUB_USERNAME || 'barecha12';
const OUTPUT_PATH = process.env.PROJECTS_OUTPUT || 'src/data/projects.ts';
const REPOS_PER_PAGE = 100;
const MAX_TAGS = 5;

const EXCLUDED_NAMES = new Set([
  'barecha12',
  'practice',
  'eco'
]);

const EXCLUDED_KEYWORDS = [
  'practice',
  'sandbox',
  'tutorial',
  'boilerplate',
  'sample'
];

const PRIORITY_REPOS = [
  'skillswap',
  'job-portal',
  'qirtas',
  'techdocs',
  'portfolio',
  'irreecha'
];

const IMAGE_OVERRIDES = {
  skillswap: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
  qirtas: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
  'job-portal': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
  portfolio: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
  irreecha: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Irreecha_Festival.jpg',
  techdocs: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80'
};

const PROJECT_OVERRIDES = {
  skillswap: {
    impact: [
      'Live platform deployed for real user skill exchange workflows.',
      'Focused on smooth matching and interaction between participants.'
    ]
  },
  qirtas: {
    impact: [
      'Designed for practical personal and shared expense tracking.',
      'Helps users maintain clear visibility of spending categories.'
    ]
  },
  'job-portal': {
    impact: [
      'Built as a full-stack hiring workflow with posting and applications.',
      'Supports clear role discovery and application management.'
    ]
  },
  portfolio: {
    impact: [
      'Showcases full-stack projects with refined UI and accessibility.',
      'Continuously improved with performance, SEO, and maintainability updates.'
    ]
  },
  irreecha: {
    impact: [
      'Highlights Oromo cultural celebration content in a dedicated product.',
      'Delivered as a publicly accessible experience with modern frontend tooling.'
    ]
  },
  techdocs: {
    description: 'Technical documentation workspace for structured guides, API references, and developer onboarding.',
    tags: ['TypeScript', 'Documentation', 'Developer Experience'],
    impact: [
      'Organizes technical guides and references for faster developer onboarding.',
      'Improves knowledge sharing with clearer documentation structure.'
    ]
  }
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function escapeTs(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ')
    .trim();
}

function normalizeUrl(value) {
  if (!value || typeof value !== 'string') return null;

  const raw = value.trim();
  if (!raw) return null;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : (
    /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw) ? `https://${raw}` : null
  );

  if (!withProtocol) return null;

  try {
    const parsed = new URL(withProtocol);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function extractUrlFromText(text) {
  if (!text || typeof text !== 'string') return null;
  const match = text.match(/https?:\/\/[^\s)]+/i);
  return match ? normalizeUrl(match[0]) : null;
}

function inferGithubPagesUrl(repo, username) {
  if (!repo?.has_pages) return null;
  const owner = (repo.owner?.login || username).toLowerCase();
  const repoName = String(repo.name || '').toLowerCase();
  if (!repoName) return null;

  if (repoName === owner) {
    return `https://${owner}.github.io/`;
  }
  return `https://${owner}.github.io/${repoName}/`;
}

function resolveDemoUrl(repo, username) {
  const homepage = normalizeUrl(repo.homepage);
  if (homepage) return homepage;

  const descriptionUrl = extractUrlFromText(repo.description);
  if (descriptionUrl) return descriptionUrl;

  return inferGithubPagesUrl(repo, username);
}

function humanizeTitle(repoName) {
  return String(repoName || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(repoName) {
  const base = String(repoName || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'project';
}

function buildTags(repo) {
  const tags = [];
  if (repo.language) tags.push(String(repo.language));
  if (Array.isArray(repo.topics)) {
    tags.push(...repo.topics.map((topic) => String(topic)));
  }
  const unique = [...new Set(tags.filter(Boolean))];
  return unique.slice(0, MAX_TAGS).length > 0 ? unique.slice(0, MAX_TAGS) : ['General'];
}

function buildDefaultImpact(repo, demoUrl) {
  const impacts = [];
  const language = repo.language ? String(repo.language) : null;

  if (demoUrl) {
    impacts.push('Live demo is available for stakeholder review and testing.');
  }

  if (language) {
    impacts.push(`Built primarily with ${language} to support maintainable development.`);
  }

  const topicsCount = Array.isArray(repo.topics) ? repo.topics.length : 0;
  if (topicsCount > 0) {
    impacts.push(`Includes focused capabilities across ${topicsCount} technical area${topicsCount > 1 ? 's' : ''}.`);
  }

  if (impacts.length < 2) {
    impacts.push('Repository demonstrates practical product engineering and delivery.');
  }

  return impacts.slice(0, 2);
}

function getPriorityWeight(repo) {
  const key = String(repo.name || '').toLowerCase();
  const index = PRIORITY_REPOS.indexOf(key);
  return index === -1 ? 0 : 1000 - (index * 100);
}

function computeRepoScore(repo) {
  const now = Date.now();
  const pushedAt = new Date(repo.pushed_at).getTime();
  const ageDays = Number.isFinite(pushedAt) ? Math.max(0, (now - pushedAt) / 86_400_000) : 365;
  const freshness = Math.max(0, 18 - (ageDays / 14));

  const stars = Number(repo.stargazers_count || 0) * 5;
  const forks = Number(repo.forks_count || 0) * 3;
  const topics = Array.isArray(repo.topics) ? repo.topics.length * 1.5 : 0;
  const demoSignal = normalizeUrl(repo.homepage) ? 20 : 0;
  const descriptionSignal = repo.description?.trim() ? 6 : 0;

  return getPriorityWeight(repo) + stars + forks + topics + demoSignal + descriptionSignal + freshness;
}

function rankRepositories(repos) {
  return [...repos].sort((a, b) => computeRepoScore(b) - computeRepoScore(a));
}

function isPortfolioQuality(repo) {
  if (!repo) return false;
  if (repo.fork || repo.archived) return false;

  const name = String(repo.name || '').toLowerCase();
  if (!name) return false;
  if (EXCLUDED_NAMES.has(name)) return false;

  if (EXCLUDED_KEYWORDS.some((keyword) => name.includes(keyword))) {
    const hasStrongSignal = Boolean(
      repo.description?.trim() ||
      normalizeUrl(repo.homepage) ||
      (Array.isArray(repo.topics) && repo.topics.length > 0)
    );
    if (!hasStrongSignal) return false;
  }

  return true;
}

function buildImageUrl(repo, username) {
  const repoName = String(repo?.name || '');
  const key = repoName.toLowerCase();
  if (IMAGE_OVERRIDES[key]) return IMAGE_OVERRIDES[key];

  const encodedOwner = encodeURIComponent(username);
  const encodedRepo = encodeURIComponent(repoName);
  return `https://opengraph.githubassets.com/1/${encodedOwner}/${encodedRepo}`;
}

async function fetchAllRepos(username) {
  const repos = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&sort=updated`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio-sync-script'
      }
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`GitHub API request failed (${response.status}): ${body}`);
    }

    const batch = await response.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    page += 1;
  }

  return repos;
}

function toProject(repo, index, username, usedIds) {
  const baseId = slugify(repo.name);
  const currentCount = usedIds.get(baseId) || 0;
  usedIds.set(baseId, currentCount + 1);
  const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
  const key = String(repo.name || '').toLowerCase();
  const override = PROJECT_OVERRIDES[key];

  const title = humanizeTitle(repo.name) || repo.name;
  const description = override?.description || repo.description?.trim() || `${title} project repository.`;
  const demo = resolveDemoUrl(repo, username);
  const tags = Array.isArray(override?.tags) && override.tags.length > 0
    ? [...new Set(override.tags)].slice(0, MAX_TAGS)
    : buildTags(repo);
  const impact = Array.isArray(override?.impact) && override.impact.length > 0
    ? [...new Set(override.impact)].slice(0, 2)
    : buildDefaultImpact(repo, demo);

  return {
    id,
    title,
    description,
    tags,
    impact,
    image: buildImageUrl(repo, username),
    repo: repo.html_url,
    demo,
    featured: index < 3
  };
}

function renderProjectsFile(projects) {
  const lines = [
    'export type Project = {',
    '  id: string;',
    '  title: string;',
    '  description: string;',
    '  tags: string[];',
    '  impact?: string[];',
    '  image: string;',
    '  repo?: string;',
    '  demo?: string;',
    '  featured?: boolean;',
    '};',
    '',
    'export const projects: Project[] = ['
  ];

  for (const project of projects) {
    const tags = project.tags.map((tag) => `'${escapeTs(tag)}'`).join(', ');
    lines.push('  {');
    lines.push(`    id: '${escapeTs(project.id)}',`);
    lines.push(`    title: '${escapeTs(project.title)}',`);
    lines.push(`    description: '${escapeTs(project.description)}',`);
    lines.push(`    tags: [${tags}],`);
    if (Array.isArray(project.impact) && project.impact.length > 0) {
      const impacts = project.impact.map((item) => `'${escapeTs(item)}'`).join(', ');
      lines.push(`    impact: [${impacts}],`);
    }
    lines.push(`    image: '${escapeTs(project.image)}',`);
    lines.push(`    repo: '${escapeTs(project.repo)}',`);
    if (project.demo) {
      lines.push(`    demo: '${escapeTs(project.demo)}',`);
    }
    lines.push(`    featured: ${project.featured ? 'true' : 'false'}`);
    lines.push('  },');
  }

  lines.push('];');
  return `${lines.join('\n')}\n`;
}

async function main() {
  const username = process.argv[2] || DEFAULT_USERNAME;
  const outputFile = path.resolve(rootDir, OUTPUT_PATH);

  const allRepos = await fetchAllRepos(username);
  const filteredRepos = rankRepositories(allRepos.filter(isPortfolioQuality));

  const usedIds = new Map();
  const projects = filteredRepos.map((repo, index) => toProject(repo, index, username, usedIds));
  const fileContents = renderProjectsFile(projects);

  await writeFile(outputFile, fileContents, 'utf8');
  console.log(`Synced ${projects.length} projects from @${username} to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
