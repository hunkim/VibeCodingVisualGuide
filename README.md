# 🎨 Vibe Coding Visual Guide

> **Struggle to describe UI components? We've got your back!** 🚀

An interactive component reference specifically designed for vibe coding - helping developers who struggle with naming and describing UI components when working with AI coding assistants.

**🌐 [Try it now - Live Demo](https://vibe-coding-visual-guide.vercel.app/)**

## 🤔 The Problem

Ever found yourself trying to describe a component to an AI and saying things like:
- "That floating thingy that appears when you hover"
- "The popup... or is it a modal?"
- "You know, that sliding panel thing"
- "The accordion... or collapsible... whatever it's called"

**You're not alone!** Many developers struggle with UI component vocabulary, making vibe coding frustrating and imprecise.

## 🚀 Quick Start

**Want to try it right now?** No installation needed!

👉 **[Open Vibe Coding Visual Guide](https://vibe-coding-visual-guide.vercel.app/)** 👈

1. Browse components in the sidebar
2. See live previews and customize options
3. Copy perfect vibe prompts or code
4. Use with ChatGPT, Claude, or any AI assistant

## ✨ The Solution

**Vibe Coding Visual Guide** is your visual dictionary for UI components. Browse, see, customize, and get perfect prompts for AI coding.

### How it works:
1. **📱 Browse** → See visual components in action
2. **🎛️ Customize** → Adjust options to match your needs  
3. **📝 Copy** → Get ready-to-use vibe prompts or code
4. **🤖 Paste** → Use with your favorite AI coding assistant

## 🚀 Features

- **Visual Component Gallery** - See exactly what each component looks like
- **Interactive Customization** - Adjust colors, sizes, variants, and more
- **Dual Output** - Get both vibe prompts and actual code
- **Copy-Paste Ready** - One-click copying for instant use
- **AI-Optimized Prompts** - Perfectly structured descriptions for AI assistants
- **Multiple Libraries** - Support for shadcn/ui, Material-UI, and HTML5
- **Responsive Design** - Works on desktop, tablet, and mobile
- **PWA Support** - Installable as a Progressive Web App

## 🎯 Perfect For

- **Vibe Coding Enthusiasts** - Get precise component descriptions
- **AI Coding Users** - Perfect prompts for ChatGPT, Claude, Copilot, etc.
- **Junior Developers** - Learn component names and usage patterns
- **Design-to-Code** - Bridge the gap between design and implementation
- **Rapid Prototyping** - Quickly find and describe the components you need

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vibe-coding-visual-guide.git

# Navigate to the project directory
cd vibe-coding-visual-guide

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build
# or
yarn build
# or
pnpm build

# Start the production server
npm start
# or
yarn start
# or
pnpm start
```

## 📖 Usage Examples

### Getting a Dialog Component Prompt

1. Select "Dialog" from the sidebar
2. Customize the title, description, and trigger text
3. Click the "Vibe Prompt" tab
4. Copy the generated prompt
5. Paste into your AI assistant

**Example Output:**
```
Create a modal dialog with the following specifications:

📋 Component: Dialog from shadcn/ui
🎯 Purpose: Modal dialog overlay

Requirements:
• Dialog title: "Confirm Action"
• Dialog description: "Are you sure you want to proceed?"
• Trigger button text: "Open Dialog"
• The dialog should be modal (overlay background)
• Include a trigger button that opens the dialog
...
```

### Getting Traditional Code

Switch to the "Code" tab to get traditional JSX code:

```jsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## 🎨 Component Libraries Supported

- **shadcn/ui** - Modern, accessible components
- **Material-UI** - Google's Material Design
- **HTML5** - Native web components

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add New Components** - Expand the component library
2. **Improve Vibe Prompts** - Make descriptions more AI-friendly
3. **Enhance UI/UX** - Better user experience
4. **Fix Bugs** - Report and fix issues
5. **Documentation** - Improve guides and examples

### Development Guidelines

1. Focus on one component at a time
2. Follow the DRY principle - reuse existing patterns
3. Test vibe prompts with actual AI assistants
4. Ensure responsive design
5. Add proper TypeScript types

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **shadcn** - For the amazing component library
- **Vercel** - For the deployment platform
- **Next.js Team** - For the fantastic framework
- **AI Coding Community** - For inspiring this project

## 🔗 Links

- **Live Demo**: [https://vibe-coding-visual-guide.vercel.app](https://vibe-coding-visual-guide.vercel.app)
- **Documentation**: Coming soon
- **Discord Community**: Coming soon

---

**Made with ❤️ for the vibe coding community**

*Having trouble describing that "floating thingy"? Now you don't have to!* 🎉 