// src/lib/arc-ui/Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArcThemeProvider } from './theme';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Arc UI/Button',
  component: Button,
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary button',
    variant: 'primary'
  },
  render: (args) => (
    <ArcThemeProvider defaultTheme="dark">
      <div style={{ padding: 20, background: '#06121c' }}>
        <Button {...args} />
      </div>
    </ArcThemeProvider>
  )
};

export const Ghost: Story = {
  args: {
    children: 'Ghost button',
    variant: 'ghost'
  },
  render: (args) => (
    <ArcThemeProvider defaultTheme="dark">
      <div style={{ padding: 20, background: '#06121c' }}>
        <Button {...args} />
      </div>
    </ArcThemeProvider>
  )
};

export const Sizes: Story = {
  render: () => (
    <ArcThemeProvider defaultTheme="dark">
      <div style={{ display: 'flex', gap: 12, padding: 20, background: '#06121c' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </ArcThemeProvider>
  )
};
