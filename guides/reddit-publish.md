# Creating and Publishing a Reddit Devvit App

This guide explains how to create and publish a Reddit Devvit app, using our calculator app as an example.

## Prerequisites

1. Install Node.js and npm
2. Install the Devvit CLI:
   ```bash
   npm install -g @devvit/cli
   ```
3. Set up a Reddit developer account at [developers.reddit.com](https://developers.reddit.com)

## Step 1: Setting Up Your Development Environment

1. Login to Devvit:
   ```bash
   devvit login
   ```
   This will open your browser to authenticate with Reddit.

2. Create a new project directory:
   ```bash
   mkdir myapps
   cd myapps
   ```

## Step 2: Creating a New App

1. Create a new Devvit app:
   ```bash
   devvit new
   ```

2. When prompted:
   - Enter your app name (e.g., "calculator")
   - Choose "web-view-post" for interactive UI applications
   - Follow the remaining prompts

## Step 3: App Structure

A typical Devvit app has the following structure:
```
calculator/
├── src/
│   ├── components/        # React components
│   │   ├── Calculator.tsx # Main component
│   │   ├── Key.tsx       # Individual key component
│   │   ├── Keypad.tsx    # Keypad layout
│   │   └── Output.tsx    # Display component
│   ├── main.tsx          # App entry point
│   └── types.ts          # TypeScript types
├── package.json          # Dependencies
├── devvit.yaml          # Devvit configuration
└── tsconfig.json        # TypeScript configuration
```

## Step 4: Key Files

### main.tsx
This is your app's entry point. It configures Devvit and defines how your app integrates with Reddit:
```typescript
import { Devvit } from '@devvit/public-api';
import { Calculator } from './components/Calculator.js';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item for moderators to create calculator posts
Devvit.addMenuItem({
  label: 'Post a calculator',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_, { reddit, ui }) => {
    // Implementation
  },
});

// Define how the calculator appears in posts
Devvit.addCustomPostType({
  name: 'Calculator',
  height: 'tall',
  render: () => {
    return <Calculator />;
  },
});
```

## Step 5: Publishing Your App

1. Upload your app:
   ```bash
   devvit upload
   ```
   This creates a new version of your app on Reddit's servers.

2. Publish your app:
   ```bash
   devvit publish
   ```
   Choose visibility:
   - Public: Available to all Reddit users after approval
   - Unlisted: Only available via direct link

3. Install on your subreddit:
   ```bash
   devvit install calculator --subreddit YOUR_SUBREDDIT_NAME
   ```

## Step 6: Testing Your App

1. Create a test post:
   - Go to your subreddit
   - Look for the "Post a calculator" option in the moderator menu
   - Create a new calculator post

2. Verify functionality:
   - Test all calculator operations
   - Check the display and layout
   - Verify error handling

## Best Practices

1. **Code Organization**
   - Keep components modular and reusable
   - Use TypeScript for better type safety
   - Follow React best practices

2. **Testing**
   - Test your app thoroughly before publishing
   - Use a test subreddit initially
   - Check both moderator and user experiences

3. **Updates**
   - Version your app appropriately
   - Test updates in a development environment
   - Document changes in your README

## Troubleshooting

Common issues and solutions:
1. **Dependencies**: Run `npm install` if you encounter missing dependencies
2. **Build Errors**: Check TypeScript errors and import paths
3. **Deployment Issues**: Verify your Reddit developer account setup

## Resources

- [Devvit Documentation](https://developers.reddit.com/docs/devvit)
- [Reddit Developer Portal](https://developers.reddit.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
