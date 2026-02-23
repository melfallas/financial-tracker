import type { Meta, StoryObj } from '@storybook/angular';
import { Navbar } from './navbar';

const meta: Meta<Navbar> = {
    title: 'Organisms/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<Navbar>;

export const Default: Story = {};

export const Scrolled: Story = {
    play: async ({ canvasElement }) => {
        // Simulate sticky state for visual verification in storybook if needed
        // But since it depends on window scroll, we can just show it as is
    }
};
