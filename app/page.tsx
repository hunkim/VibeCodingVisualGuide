"use client"

import { useState, useMemo } from "react"
import { Search, Copy, Check, ChevronDown } from "lucide-react"
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
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Vibe Coding Visual Guide</h1>
          <p className="text-gray-400 text-sm mt-1">Interactive component reference for Vibe coding</p>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Navigation */}
        <div className="w-80 border-r border-gray-800 bg-gray-900/30 flex flex-col">
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
        <div className="flex-1 flex">
          <div className="flex-1 p-6 overflow-auto">
            {selectedComponent ? (
              <div className="max-w-4xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white">{selectedComponent.name}</h2>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                      {selectedComponent.library}
                    </Badge>
                  </div>
                  <p className="text-gray-400">{selectedComponent.description}</p>
                </div>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-gray-800/30 rounded-b-lg">
                    <div className="p-8 flex items-center justify-center min-h-[200px]">
                      <ComponentPreview component={selectedComponent} options={componentOptions} />
                    </div>
                  </CardContent>
                </Card>

                {/* Variations */}
                {selectedComponent.variations && (
                  <Card className="mt-6 bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Variations</CardTitle>
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
                <div className="text-center max-w-2xl px-8">
                  <div className="text-6xl mb-6">🎨</div>
                  <h2 className="text-3xl font-bold text-white mb-4">Struggle to Describe UI Components?</h2>
                  <p className="text-xl text-blue-300 mb-6 font-medium">
                    We've got your back! 🚀
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Don't know what that "floating thingy" is called? Can't remember if it's a "popup" or "modal"? 
                    Browse our visual component gallery, see exactly what each component looks like, and get 
                    <span className="text-blue-300 font-medium"> perfect vibe prompts</span> to describe them to AI.
                  </p>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-left">
                    <h3 className="text-white font-semibold mb-3">✨ How it works:</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>📱 <strong>Browse</strong> → See visual components in action</p>
                      <p>🎛️ <strong>Customize</strong> → Adjust options to match your needs</p>
                      <p>📝 <strong>Copy</strong> → Get ready-to-use vibe prompts or code</p>
                      <p>🤖 <strong>Paste</strong> → Use with your favorite AI coding assistant</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mt-6">
                    <strong>Start by selecting any component from the sidebar →</strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Options & Code */}
          {selectedComponent && (
            <div className="w-96 border-l border-gray-800 bg-gray-900/30 flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold text-white">
                  {selectedComponent.library}: {selectedComponent.name}
                </h3>
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
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
                        <button
                          onClick={() => setActiveTab('vibe')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'vibe'
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                          }`}
                        >
                          Vibe Prompt
                        </button>
                        <button
                          onClick={() => setActiveTab('code')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
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
                        className={`transition-all duration-200 ${
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
                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-auto">
                      {activeTab === 'vibe' ? (
                        <MarkdownDisplay 
                          content={generatedVibePrompt} 
                          className="text-sm"
                        />
                      ) : (
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
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
    </div>
  )
}
