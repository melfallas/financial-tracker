import type { Meta, StoryObj } from '@storybook/angular';
import { Hero } from './hero';

const meta: Meta<Hero> = {
    title: 'Organisms/Hero',
    component: Hero,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<Hero>;

export const Default: Story = {};
