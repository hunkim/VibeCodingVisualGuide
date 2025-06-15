"use client"

import { useState, useMemo } from "react"
import { Search, Copy, Check, ChevronDown, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { componentRegistry, type ComponentInfo } from "@/lib/component-registry"
import { generateCode, generateVibePrompt } from "@/lib/code-generator"
import { ComponentPreview } from "@/components/component-preview"
import { OptionControls } from "@/components/option-controls"
import { MarkdownDisplay } from "@/components/markdown-display"

export default function VibeCodingVisualGuide() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  const [componentOptions, setComponentOptions] = useState<Record<string, any>>({})
  const [copiedCode, setCopiedCode] = useState(false)
  // Add state for collapsed categories
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  // Add state for active tab (Vibe Prompt as default)
  const [activeTab, setActiveTab] = useState<'vibe' | 'code'>('vibe')
  // Add state for mobile sidebar toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  // Add state for mobile options panel toggle
  const [isMobileOptionsOpen, setIsMobileOptionsOpen] = useState(false)

  // Filter components based on search term
  const filteredComponents = useMemo(() => {
    if (!searchTerm) return componentRegistry

    const filtered: typeof componentRegistry = {}
    Object.entries(componentRegistry).forEach(([library, categories]) => {
      const matchingCategories = categories
        .map((category) => ({
          ...category,
          components: category.components.filter(
            (component) =>
              component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              category.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((category) => category.components.length > 0)

      if (matchingCategories.length > 0) {
        filtered[library] = matchingCategories
      }
    })
    return filtered
  }, [searchTerm])

  // Initialize options when component is selected
  const handleComponentSelect = (component: ComponentInfo) => {
    setSelectedComponent(component)
    const defaultOptions: Record<string, any> = {}
    component.options.forEach((option) => {
      defaultOptions[option.name] = option.defaultValue
    })
    setComponentOptions(defaultOptions)
    // Close mobile sidebar after selection
    setIsMobileSidebarOpen(false)
  }

  // Update component options
  const handleOptionChange = (optionName: string, value: any) => {
    setComponentOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  // Generate and copy content based on active tab
  const handleCopyCode = async () => {
    if (!selectedComponent) return

    const content = activeTab === 'vibe' 
      ? generateVibePrompt(selectedComponent, componentOptions)
      : generateCode(selectedComponent, componentOptions)
    
    await navigator.clipboard.writeText(content)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const generatedVibePrompt = selectedComponent ? generateVibePrompt(selectedComponent, componentOptions) : ""
  const generatedCode = selectedComponent ? generateCode(selectedComponent, componentOptions) : ""

  // Add function to toggle category
  const toggleCategory = (categoryKey: string) => {
    const newCollapsed = new Set(collapsedCategories)
    if (newCollapsed.has(categoryKey)) {
      newCollapsed.delete(categoryKey)
    } else {
      newCollapsed.add(categoryKey)
    }
    setCollapsedCategories(newCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger menu */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-400 hover:text-gray-100"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">🎨 Vibe Coding Visual Guide</h1>
                <p className="text-gray-400 text-xs md:text-sm mt-1 hidden sm:block">Interactive component reference for Vibe coding</p>
              </div>
            </div>
            {/* Mobile options button */}
            {selectedComponent && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-400 hover:text-gray-100"
                onClick={() => setIsMobileOptionsOpen(true)}
              >
                <span className="text-sm">Options</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
        )}

        {/* Left Sidebar - Navigation */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          w-80 md:w-80 lg:w-96 
          border-r border-gray-800 bg-gray-900/95 md:bg-gray-900/30 
          backdrop-blur-sm md:backdrop-blur-none
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Mobile close button */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Components</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Component List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {Object.entries(filteredComponents).map(([library, categories]) => (
                <div key={library}>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide border-b border-gray-800 pb-2">
                    {library}
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const categoryKey = `${library}-${category.name}`
                      const isCollapsed = collapsedCategories.has(categoryKey)

                      return (
                        <div key={category.name}>
                          <button
                            onClick={() => toggleCategory(categoryKey)}
                            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-800/50 text-gray-300 hover:text-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{category.icon}</span>
                              <span className="font-medium text-sm">{category.name}</span>
                              <span className="text-xs text-gray-500">({category.components.length})</span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                            />
                          </button>

                          {!isCollapsed && (
                            <div className="ml-6 mt-1 space-y-1">
                              {category.components.map((component) => (
                                <button
                                  key={`${library}-${component.name}`}
                                  onClick={() => handleComponentSelect(component)}
                                  className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                                    selectedComponent?.name === component.name && selectedComponent?.library === library
                                      ? "bg-blue-600/20 border border-blue-600/30 text-blue-300"
                                      : "hover:bg-gray-800/30 text-gray-400 hover:text-gray-200"
                                  }`}
                                >
                                  <div className="font-medium">{component.name}</div>
                                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                    {component.description}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            {selectedComponent ? (
              <div className="max-w-4xl">
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedComponent.name}</h2>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30 w-fit">
                      {selectedComponent.library}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base">{selectedComponent.description}</p>
                </div>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-gray-800/30 rounded-b-lg">
                    <div className="p-4 md:p-8 flex items-center justify-center min-h-[150px] md:min-h-[200px]">
                      <ComponentPreview component={selectedComponent} options={componentOptions} />
                    </div>
                  </CardContent>
                </Card>

                {/* Variations */}
                {selectedComponent.variations && (
                  <Card className="mt-4 md:mt-6 bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg md:text-xl">Variations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedComponent.variations.map((variation, index) => (
                          <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                            <div className="mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {variation.name}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-center p-4 bg-gray-700/30 rounded">
                              <ComponentPreview component={selectedComponent} options={variation.options} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-2xl px-4 md:px-8">
                  <div className="text-4xl md:text-6xl mb-4 md:mb-6">🎨</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Struggle to Describe UI Components?</h2>
                  <p className="text-lg md:text-xl text-blue-300 mb-4 md:mb-6 font-medium">
                    We've got your back! 🚀
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                    Don't know what that "floating thingy" is called? Can't remember if it's a "popup" or "modal"? 
                    Browse our visual component gallery, see exactly what each component looks like, and get 
                    <span className="text-blue-300 font-medium"> perfect vibe prompts</span> to describe them to AI.
                  </p>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6 text-left">
                    <h3 className="text-white font-semibold mb-3">✨ How it works:</h3>
                    <div className="space-y-2 text-gray-300 text-sm md:text-base">
                      <p>📱 <strong>Browse</strong> → See visual components in action</p>
                      <p>🎛️ <strong>Customize</strong> → Adjust options to match your needs</p>
                      <p>📝 <strong>Copy</strong> → Get ready-to-use vibe prompts or code</p>
                      <p>🤖 <strong>Paste</strong> → Use with your favorite AI coding assistant</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mt-4 md:mt-6 text-sm md:text-base">
                    <strong className="md:hidden">Tap the menu button to browse components</strong>
                    <strong className="hidden md:block">Start by selecting any component from the sidebar →</strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Options Panel Overlay */}
          {isMobileOptionsOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOptionsOpen(false)} />
          )}

          {/* Right Sidebar - Options & Code */}
          {selectedComponent && (
            <div className={`
              fixed md:relative inset-y-0 right-0 z-50 md:z-auto
              w-full md:w-96 
              border-l border-gray-800 bg-gray-900/95 md:bg-gray-900/30 
              backdrop-blur-sm md:backdrop-blur-none
              flex flex-col
              transform transition-transform duration-300 ease-in-out
              ${isMobileOptionsOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="font-semibold text-white text-sm md:text-base">
                  {selectedComponent.library}: {selectedComponent.name}
                </h3>
                {/* Mobile close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOptionsOpen(false)}
                  className="md:hidden text-gray-400 hover:text-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                  {/* Options */}
                  {selectedComponent.options.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-300 mb-3">Options</h4>
                      <OptionControls
                        options={selectedComponent.options}
                        values={componentOptions}
                        onChange={handleOptionChange}
                      />
                    </div>
                  )}

                  <Separator className="bg-gray-800" />

                  {/* Tabs */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 w-full sm:w-auto">
                        <button
                          onClick={() => setActiveTab('vibe')}
                          className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'vibe'
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                          }`}
                        >
                          Vibe Prompt
                        </button>
                        <button
                          onClick={() => setActiveTab('code')}
                          className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'code'
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                          }`}
                        >
                          Code
                        </button>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleCopyCode}
                        className={`w-full sm:w-auto transition-all duration-200 ${
                          copiedCode 
                            ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        {copiedCode ? (
                          <>
                            <Check className="h-4 w-4 mr-1.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1.5" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 md:p-4 overflow-auto max-h-96 md:max-h-none">
                      {activeTab === 'vibe' ? (
                        <MarkdownDisplay 
                          content={generatedVibePrompt} 
                          className="text-xs md:text-sm"
                        />
                      ) : (
                        <pre className="text-xs md:text-sm text-gray-300 whitespace-pre-wrap">
                          <code>{generatedCode}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Creator Credit */}
              <div className="text-center md:text-left">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Created with ❤️ for Vibe Coders</h3>
                <p className="text-gray-400 mb-3 text-sm md:text-base">
                  Built by <a 
                    href="https://www.linkedin.com/in/hunkimup/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sung Kim
                  </a> to solve the "floating thingy" problem once and for all! 🚀
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Making vibe coding easier, one component at a time.
                </p>
              </div>

              {/* Community CTA */}
              <div className="text-center md:text-right">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">Help Make This Better!</h3>
                <p className="text-gray-400 mb-4 text-sm md:text-base">
                  Got ideas for new components? Found a bug? Want better vibe prompts?
                </p>
                <a
                  href="https://github.com/hunkim/VibeCodingVisualGuide/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base w-full sm:w-auto"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Share Your Ideas
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  Every suggestion helps the community! 🌟
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-xs md:text-sm">
                <span className="font-medium">Vibe Coding Visual Guide</span> - 
                Because no developer should struggle to describe "that accordion thing" ever again! 
                <span className="text-blue-400">✨</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
