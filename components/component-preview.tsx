import type { ComponentInfo } from "@/lib/component-registry"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ComponentPreviewProps {
  component: ComponentInfo
  options: Record<string, any>
}

export function ComponentPreview({ component, options }: ComponentPreviewProps) {
  if (component.library === "shadcn/ui") {
    return <ShadcnPreview component={component} options={options} />
  } else if (component.library === "HTML5") {
    return <HTMLPreview component={component} options={options} />
  } else if (component.library === "Material-UI") {
    return <MUIPreview component={component} options={options} />
  }

  return <div>Preview not available</div>
}

function ShadcnPreview({ component, options }: ComponentPreviewProps) {
  switch (component.name) {
    case "Button":
      return (
        <Button variant={options.variant as any} size={options.size as any} disabled={options.disabled}>
          {options.children}
        </Button>
      )
    case "Input":
      return (
        <Input type={options.type} placeholder={options.placeholder} disabled={options.disabled} className="w-64" />
      )
    case "Badge":
      return <Badge variant={options.variant as any}>{options.children}</Badge>
    case "Card":
      return (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>{options.title}</CardTitle>
            <CardDescription>{options.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{options.content}</p>
          </CardContent>
          {options.showFooter && (
            <CardFooter>
              <p className="text-sm text-gray-500">Card Footer</p>
            </CardFooter>
          )}
        </Card>
      )
    case "Alert":
      return (
        <div className="w-80">
          <div
            className={`p-4 rounded-lg border ${options.variant === "destructive" ? "bg-red-50 border-red-200 text-red-800" : "bg-blue-50 border-blue-200 text-blue-800"}`}
          >
            <h4 className="font-semibold">{options.title}</h4>
            <p className="text-sm mt-1">{options.description}</p>
          </div>
        </div>
      )
    case "Avatar":
      const avatarSize = options.size === "sm" ? "h-8 w-8" : options.size === "lg" ? "h-16 w-16" : "h-12 w-12"
      return (
        <div
          className={`${avatarSize} rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium`}
        >
          {options.src ? (
            <img
              src={options.src || "/placeholder.svg"}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm">{options.fallback}</span>
          )}
        </div>
      )
    case "Checkbox":
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.checked}
            disabled={options.disabled}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            readOnly
          />
          <label className="text-sm text-gray-700">{options.label}</label>
        </div>
      )
    case "Switch":
      const switchSize = options.size === "sm" ? "h-4 w-7" : options.size === "lg" ? "h-7 w-12" : "h-5 w-9"
      const thumbSize = options.size === "sm" ? "h-3 w-3" : options.size === "lg" ? "h-6 w-6" : "h-4 w-4"
      return (
        <div
          className={`${switchSize} bg-gray-300 rounded-full p-1 ${options.checked ? "bg-blue-600" : ""} transition-colors ${options.disabled ? "opacity-50" : ""}`}
        >
          <div
            className={`${thumbSize} bg-white rounded-full shadow-md transform transition-transform ${options.checked ? "translate-x-full" : ""}`}
          ></div>
        </div>
      )
    case "Progress":
      const progressHeight = options.size === "sm" ? "h-1" : options.size === "lg" ? "h-3" : "h-2"
      return (
        <div className="w-64">
          <div className={`${progressHeight} bg-gray-200 rounded-full overflow-hidden`}>
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, options.value))}%` }}
            ></div>
          </div>
        </div>
      )
    case "Slider":
      return (
        <div className="w-64 px-2">
          <input
            type="range"
            min={options.min}
            max={options.max}
            step={options.step}
            value={options.defaultValue}
            disabled={options.disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            readOnly
          />
        </div>
      )
    case "Textarea":
      return (
        <textarea
          placeholder={options.placeholder}
          rows={options.rows}
          disabled={options.disabled}
          className={`w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${options.resize === "none" ? "resize-none" : options.resize === "horizontal" ? "resize-x" : options.resize === "vertical" ? "resize-y" : "resize"}`}
          readOnly
        />
      )
    case "Select":
      return (
        <select
          disabled={options.disabled}
          className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">{options.placeholder}</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      )
    case "Separator":
      return (
        <div className="w-64 h-32 flex items-center justify-center">
          {options.orientation === "vertical" ? (
            <div className="h-full w-px bg-gray-300"></div>
          ) : (
            <div className="w-full h-px bg-gray-300"></div>
          )}
        </div>
      )
    case "Skeleton":
      const isCircle = options.shape === "circle"
      return (
        <div
          className={`bg-gray-300 animate-pulse ${isCircle ? "rounded-full" : "rounded"}`}
          style={{
            width: isCircle ? options.height : options.width,
            height: options.height,
          }}
        ></div>
      )
    case "ScrollArea":
      return (
        <div
          className="border border-gray-300 rounded-md overflow-auto bg-white"
          style={{ width: options.width, height: options.height }}
        >
          <div className="p-4">
            <p>{options.content}</p>
            <p>This is additional content to demonstrate scrolling behavior.</p>
            <p>More content here...</p>
            <p>Even more content to make it scrollable...</p>
            <p>Last line of content.</p>
          </div>
        </div>
      )
    case "Tabs":
      return (
        <div className="w-80">
          <div className={`flex ${options.orientation === "vertical" ? "flex-col" : "border-b border-gray-200"}`}>
            <div
              className={`flex ${options.orientation === "vertical" ? "flex-col border-r border-gray-200 w-32" : ""}`}
            >
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Tab 1</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Tab 2</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Tab 3</button>
            </div>
            {options.orientation === "vertical" && (
              <div className="flex-1 p-4">
                <p>Tab content goes here</p>
              </div>
            )}
          </div>
          {options.orientation === "horizontal" && (
            <div className="p-4">
              <p>Tab content goes here</p>
            </div>
          )}
        </div>
      )
    case "Accordion":
      return (
        <div className="w-80 border border-gray-200 rounded-md">
          <div className="border-b border-gray-200">
            <button className="w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-between">
              <span>Accordion Item 1</span>
              <span>+</span>
            </button>
            <div className="px-4 py-3 text-gray-600">
              <p>Accordion content for item 1</p>
            </div>
          </div>
          <div>
            <button className="w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-between">
              <span>Accordion Item 2</span>
              <span>+</span>
            </button>
          </div>
        </div>
      )
    case "Dialog":
      return (
        <div className="relative">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{options.triggerText}</button>
          <div className="absolute top-12 left-0 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-6 z-10">
            <h3 className="text-lg font-semibold mb-2">{options.title}</h3>
            <p className="text-gray-600 mb-4">{options.description}</p>
            <div className="flex justify-end space-x-2">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">OK</button>
            </div>
          </div>
        </div>
      )
    case "Popover":
      return (
        <div className="relative">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            {options.triggerText}
          </button>
          <div className="absolute top-12 left-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
            <p className="text-sm text-gray-600">{options.content}</p>
          </div>
        </div>
      )
    case "Tooltip":
      return (
        <div className="relative group">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">{options.trigger}</button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {options.content}
          </div>
        </div>
      )
    case "Calendar":
      return (
        <div className="w-80 p-4 bg-white border border-gray-300 rounded-lg">
          <div className="text-center mb-4">
            <h3 className="font-semibold">January 2024</h3>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div key={day} className="p-2 font-medium text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className={`p-2 hover:bg-blue-100 rounded cursor-pointer ${i === 14 ? "bg-blue-600 text-white" : ""}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )
    case "Command":
      return (
        <div className="w-80 border border-gray-300 rounded-lg bg-white">
          <div className="p-3 border-b border-gray-200">
            <input placeholder={options.placeholder} className="w-full outline-none text-sm" />
          </div>
          <div className="p-2">
            <div className="text-xs text-gray-500 px-2 py-1">Suggestions</div>
            <div className="space-y-1">
              <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Calendar</div>
              <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Search Emoji</div>
              <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Calculator</div>
            </div>
          </div>
        </div>
      )
    case "ContextMenu":
      return (
        <div className="relative">
          <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded text-center cursor-pointer">
            {options.triggerText}
          </div>
          <div className="absolute top-12 left-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-1 z-10">
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Cut</div>
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Copy</div>
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Paste</div>
            <div className="border-t border-gray-200 my-1"></div>
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Delete</div>
          </div>
        </div>
      )
    case "DropdownMenu":
      return (
        <div className="relative">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            {options.triggerText}
          </button>
          <div className="absolute top-12 left-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-1 z-10">
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Profile</div>
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Settings</div>
            <div className="border-t border-gray-200 my-1"></div>
            <div className="px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">Logout</div>
          </div>
        </div>
      )
    case "HoverCard":
      return (
        <div className="relative group">
          <span className="text-blue-600 underline cursor-pointer">{options.triggerText}</span>
          <div className="absolute bottom-full left-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <p className="text-sm">{options.content}</p>
          </div>
        </div>
      )
    case "Menubar":
      return (
        <div className="w-80 bg-gray-100 border border-gray-300 rounded">
          <div className="flex">
            <button className="px-3 py-2 text-sm hover:bg-gray-200">File</button>
            <button className="px-3 py-2 text-sm hover:bg-gray-200">Edit</button>
            <button className="px-3 py-2 text-sm hover:bg-gray-200">View</button>
            <button className="px-3 py-2 text-sm hover:bg-gray-200">Help</button>
          </div>
        </div>
      )
    case "NavigationMenu":
      return (
        <nav className={`${options.orientation === "vertical" ? "w-48" : "w-80"}`}>
          <div
            className={`flex ${options.orientation === "vertical" ? "flex-col" : "space-x-4"} p-4 bg-gray-100 rounded`}
          >
            <a href="#" className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Home
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              About
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Services
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Contact
            </a>
          </div>
        </nav>
      )
    case "Pagination":
      return (
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Previous</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">1</button>
          <button className="px-3 py-1 text-sm border border-blue-600 bg-blue-600 text-white rounded">2</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">3</button>
          <span className="px-2 text-sm text-gray-500">...</span>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
            {options.totalPages}
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Next</button>
        </div>
      )
    case "RadioGroup":
      return (
        <div
          className={`space-${options.orientation === "vertical" ? "y" : "x"}-4 ${options.orientation === "horizontal" ? "flex" : ""}`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="radio-group"
              value="option1"
              checked={options.defaultValue === "option1"}
              className="h-4 w-4"
              readOnly
            />
            <label className="text-sm">Option 1</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="radio-group"
              value="option2"
              checked={options.defaultValue === "option2"}
              className="h-4 w-4"
              readOnly
            />
            <label className="text-sm">Option 2</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="radio-group"
              value="option3"
              checked={options.defaultValue === "option3"}
              className="h-4 w-4"
              readOnly
            />
            <label className="text-sm">Option 3</label>
          </div>
        </div>
      )
    case "Sheet":
      return (
        <div className="relative w-80 h-48">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{options.triggerText}</button>
          <div
            className={`absolute ${options.side === "left" ? "left-0 top-0 h-full w-64" : options.side === "right" ? "right-0 top-0 h-full w-64" : options.side === "top" ? "top-0 left-0 w-full h-32" : "bottom-0 left-0 w-full h-32"} bg-white border border-gray-300 shadow-lg p-4`}
          >
            <h3 className="font-semibold mb-2">{options.title}</h3>
            <p className="text-sm text-gray-600">Sheet content goes here</p>
          </div>
        </div>
      )
    case "Table":
      return (
        <div className="w-full max-w-2xl">
          {options.caption && <div className="mb-2 text-sm font-medium text-gray-700">{options.caption}</div>}
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-4 py-2 text-left text-sm font-medium">Invoice</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Method</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b border-gray-300 ${options.striped ? "bg-gray-50" : ""}`}>
                <td className="px-4 py-2 text-sm">INV001</td>
                <td className="px-4 py-2 text-sm">Paid</td>
                <td className="px-4 py-2 text-sm">Credit Card</td>
                <td className="px-4 py-2 text-sm">$250.00</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="px-4 py-2 text-sm">INV002</td>
                <td className="px-4 py-2 text-sm">Pending</td>
                <td className="px-4 py-2 text-sm">PayPal</td>
                <td className="px-4 py-2 text-sm">$150.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    case "Toggle":
      return (
        <button
          className={`px-3 py-2 rounded font-medium transition-colors ${
            options.pressed
              ? "bg-blue-600 text-white"
              : options.variant === "outline"
                ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } ${options.size === "sm" ? "px-2 py-1 text-sm" : options.size === "lg" ? "px-4 py-3 text-lg" : ""}`}
        >
          {options.children}
        </button>
      )
    case "ToggleGroup":
      return (
        <div className="flex border border-gray-300 rounded overflow-hidden">
          <button className="px-3 py-2 text-sm bg-blue-600 text-white">Left</button>
          <button className="px-3 py-2 text-sm border-l border-gray-300 hover:bg-gray-100">Center</button>
          <button className="px-3 py-2 text-sm border-l border-gray-300 hover:bg-gray-100">Right</button>
        </div>
      )
    case "Breadcrumb":
      return (
        <nav className="flex items-center space-x-2 text-sm">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{options.separator}</span>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Category
          </a>
          <span className="text-gray-400">{options.separator}</span>
          <span className="text-gray-600">Current Page</span>
        </nav>
      )
    case "Collapsible":
      return (
        <div className="w-64 border border-gray-300 rounded">
          <button className="w-full px-4 py-2 text-left font-medium hover:bg-gray-100 flex items-center justify-between">
            <span>{options.triggerText}</span>
            <span>{options.defaultOpen ? "−" : "+"}</span>
          </button>
          {options.defaultOpen && (
            <div className="px-4 py-2 border-t border-gray-300 text-sm text-gray-600">{options.content}</div>
          )}
        </div>
      )
    case "Drawer":
      return (
        <div className="relative w-80 h-48">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{options.triggerText}</button>
          <div className="absolute bottom-0 left-0 right-0 bg-white border border-gray-300 rounded-t-lg shadow-lg p-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold mb-2">{options.title}</h3>
            <p className="text-sm text-gray-600">{options.description}</p>
          </div>
        </div>
      )
    case "Resizable":
      return (
        <div
          className={`w-80 h-48 border border-gray-300 rounded flex ${options.direction === "vertical" ? "flex-col" : ""}`}
        >
          <div className="flex-1 bg-gray-100 p-4 text-sm">Panel 1</div>
          <div
            className={`${options.direction === "vertical" ? "h-1 cursor-row-resize" : "w-1 cursor-col-resize"} bg-gray-300 hover:bg-gray-400`}
          ></div>
          <div className="flex-1 bg-gray-50 p-4 text-sm">Panel 2</div>
        </div>
      )
    case "Sonner":
      return (
        <div className="relative w-80 h-32">
          <div
            className={`absolute ${options.position.includes("top") ? "top-4" : "bottom-4"} ${options.position.includes("left") ? "left-4" : options.position.includes("right") ? "right-4" : "left-1/2 transform -translate-x-1/2"} bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-64`}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Success!</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Your action was completed successfully.</p>
          </div>
        </div>
      )
    case "Chart":
      const chartData = {
        sales: [
          { month: "Jan", value: 400 },
          { month: "Feb", value: 300 },
          { month: "Mar", value: 600 },
          { month: "Apr", value: 800 },
          { month: "May", value: 500 },
        ],
        users: [
          { month: "Jan", value: 100 },
          { month: "Feb", value: 150 },
          { month: "Mar", value: 200 },
          { month: "Apr", value: 180 },
          { month: "May", value: 220 },
        ],
        revenue: [
          { month: "Jan", value: 1000 },
          { month: "Feb", value: 1200 },
          { month: "Mar", value: 1500 },
          { month: "Apr", value: 1800 },
          { month: "May", value: 2000 },
        ],
      }
      const data = chartData[options.data as keyof typeof chartData] || chartData.sales

      return (
        <div className="w-80 h-64 p-4 border border-gray-300 rounded">
          <div className="mb-2 text-sm font-medium">
            {options.type.charAt(0).toUpperCase() + options.type.slice(1)} Chart - {options.data}
          </div>
          {options.type === "pie" ? (
            <div className="w-full h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-medium">Pie Chart</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 relative">
              {options.showGrid && (
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              )}
              <svg className="w-full h-full" viewBox="0 0 300 150">
                {options.type === "line" && (
                  <polyline
                    points={data.map((d, i) => `${i * 60 + 30},${150 - d.value / 10}`).join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                )}
                {options.type === "bar" &&
                  data.map((d, i) => (
                    <rect
                      key={i}
                      x={i * 60 + 20}
                      y={150 - d.value / 10}
                      width="20"
                      height={d.value / 10}
                      fill="#3b82f6"
                    />
                  ))}
                {options.type === "area" && (
                  <polygon
                    points={`30,150 ${data.map((d, i) => `${i * 60 + 30},${150 - d.value / 10}`).join(" ")} 270,150`}
                    fill="#3b82f6"
                    fillOpacity="0.3"
                  />
                )}
              </svg>
              {options.showLegend && (
                <div className="absolute bottom-0 left-0 text-xs text-gray-600">
                  {data.map((d, i) => (
                    <span key={i} className="mr-4">
                      {d.month}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )

    case "DataTable":
      return (
        <div className="w-full max-w-4xl border border-gray-300 rounded">
          {options.filterable && (
            <div className="p-3 border-b border-gray-300 bg-gray-50">
              <input placeholder="Search..." className="px-3 py-1 border border-gray-300 rounded text-sm w-64" />
            </div>
          )}
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {options.selectable && (
                  <th className="w-8 p-2">
                    <input type="checkbox" />
                  </th>
                )}
                <th className="text-left p-2 text-sm font-medium">
                  Name {options.sortable && <span className="ml-1">↕️</span>}
                </th>
                <th className="text-left p-2 text-sm font-medium">
                  Email {options.sortable && <span className="ml-1">↕️</span>}
                </th>
                <th className="text-left p-2 text-sm font-medium">
                  Status {options.sortable && <span className="ml-1">↕️</span>}
                </th>
                <th className="text-left p-2 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(options.pageSize, 5) }, (_, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                  {options.selectable && (
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>
                  )}
                  <td className="p-2 text-sm">User {i + 1}</td>
                  <td className="p-2 text-sm">user{i + 1}@example.com</td>
                  <td className="p-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {i % 2 === 0 ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="p-2 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {options.pagination && (
            <div className="p-3 border-t border-gray-300 flex items-center justify-between">
              <span className="text-sm text-gray-600">Showing 1-{options.pageSize} of 100</span>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">Next</button>
              </div>
            </div>
          )}
        </div>
      )

    case "Carousel":
      return (
        <div className="w-80 h-48 relative border border-gray-300 rounded overflow-hidden">
          <div className={`flex ${options.orientation === "vertical" ? "flex-col h-full" : "w-full h-full"}`}>
            <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
              Slide 1
            </div>
          </div>
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow">
            ←
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow">
            →
          </button>
          {options.showDots && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          )}
          {options.autoplay && (
            <div className="absolute top-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
              Auto
            </div>
          )}
        </div>
      )

    case "Sidebar":
      return (
        <div className="w-80 h-64 flex border border-gray-300 rounded overflow-hidden">
          <div className={`${options.collapsible === "icon" ? "w-16" : "w-64"} bg-gray-900 text-white flex flex-col`}>
            <div className="p-4 border-b border-gray-700">
              <div className="font-semibold">{options.collapsible === "icon" ? "A" : "App Name"}</div>
            </div>
            <nav className="flex-1 p-2">
              <div className="space-y-1">
                <div className="flex items-center px-3 py-2 rounded bg-blue-600">
                  <span className="mr-3">🏠</span>
                  {options.collapsible !== "icon" && <span>Dashboard</span>}
                </div>
                <div className="flex items-center px-3 py-2 rounded hover:bg-gray-800">
                  <span className="mr-3">👥</span>
                  {options.collapsible !== "icon" && <span>Users</span>}
                </div>
                <div className="flex items-center px-3 py-2 rounded hover:bg-gray-800">
                  <span className="mr-3">⚙️</span>
                  {options.collapsible !== "icon" && <span>Settings</span>}
                </div>
              </div>
            </nav>
          </div>
          <div className="flex-1 bg-gray-50 p-4">
            <h2 className="text-lg font-semibold mb-2">Main Content</h2>
            <p className="text-gray-600">Content area with sidebar navigation</p>
          </div>
        </div>
      )

    case "InputOTP":
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            {Array.from({ length: options.maxLength }, (_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-lg font-mono"
                value={i === 0 ? "1" : i === 1 ? "2" : ""}
                readOnly
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">Enter {options.maxLength}-digit code</div>
        </div>
      )

    case "Combobox":
      return (
        <div className="w-64 relative">
          <div className="relative">
            <input
              placeholder="Search options..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">▼</div>
            {options.clearable && (
              <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                ×
              </button>
            )}
          </div>
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-auto z-10">
            <div className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm flex items-center">
              {options.multiple && <input type="checkbox" className="mr-2" />}
              Option 1
            </div>
            <div className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm flex items-center">
              {options.multiple && <input type="checkbox" className="mr-2" />}
              Option 2
            </div>
            <div className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm flex items-center">
              {options.multiple && <input type="checkbox" className="mr-2" />}
              Option 3
            </div>
          </div>
        </div>
      )
    default:
      return <div>Component preview not implemented</div>
  }
}

function HTMLPreview({ component, options }: ComponentPreviewProps) {
  switch (component.name) {
    case "Button":
      return (
        <button
          type={options.type}
          disabled={options.disabled}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.children}
        </button>
      )
    case "Input":
      return (
        <input
          type={options.type}
          placeholder={options.placeholder}
          required={options.required}
          disabled={options.disabled}
          readOnly={options.readonly}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 w-64"
        />
      )
    case "Select":
      return (
        <select
          multiple={options.multiple}
          disabled={options.disabled}
          size={options.size}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 w-64"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
        </select>
      )
    case "Textarea":
      return (
        <textarea
          placeholder={options.placeholder}
          rows={options.rows}
          cols={options.cols}
          disabled={options.disabled}
          readOnly={options.readonly}
          className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 w-64 ${options.resize === "none" ? "resize-none" : options.resize === "horizontal" ? "resize-x" : options.resize === "vertical" ? "resize-y" : "resize"}`}
        />
      )
    case "Progress":
      return <progress value={options.value} max={options.max} className="w-64 h-4" />
    case "Meter":
      return (
        <meter
          value={options.value}
          min={options.min}
          max={options.max}
          low={options.low}
          high={options.high}
          optimum={options.optimum}
          className="w-64 h-4"
        />
      )
    case "Details":
      return (
        <details open={options.open} className="w-64">
          <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">{options.summary}</summary>
          <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-600">{options.content}</div>
        </details>
      )
    case "Dialog":
      return (
        <div className="w-64">
          <dialog open={options.open} className="border border-gray-300 rounded-lg p-4 shadow-lg">
            <p>{options.content}</p>
            <div className="mt-4 flex justify-end">
              <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Close</button>
            </div>
          </dialog>
        </div>
      )
    case "Fieldset":
      return (
        <fieldset disabled={options.disabled} className="border border-gray-300 rounded p-4 w-64">
          <legend className="px-2 font-medium text-gray-700">{options.legend}</legend>
          <div className="space-y-2">
            <label className="block">
              <input type="text" placeholder="Field 1" className="w-full px-2 py-1 border border-gray-300 rounded" />
            </label>
            <label className="block">
              <input type="text" placeholder="Field 2" className="w-full px-2 py-1 border border-gray-300 rounded" />
            </label>
          </div>
        </fieldset>
      )
    case "Table":
      return (
        <table className={`w-full max-w-md ${options.border ? "border border-gray-300" : ""}`}>
          {options.caption && <caption className="mb-2 font-medium text-gray-700">{options.caption}</caption>}
          <thead>
            <tr className={options.border ? "border-b border-gray-300" : ""}>
              <th className="px-3 py-2 text-left">Header 1</th>
              <th className="px-3 py-2 text-left">Header 2</th>
              <th className="px-3 py-2 text-left">Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={`${options.striped ? "bg-gray-50" : ""} ${options.border ? "border-b border-gray-300" : ""}`}
            >
              <td className="px-3 py-2">Row 1, Col 1</td>
              <td className="px-3 py-2">Row 1, Col 2</td>
              <td className="px-3 py-2">Row 1, Col 3</td>
            </tr>
            <tr className={options.border ? "border-b border-gray-300" : ""}>
              <td className="px-3 py-2">Row 2, Col 1</td>
              <td className="px-3 py-2">Row 2, Col 2</td>
              <td className="px-3 py-2">Row 2, Col 3</td>
            </tr>
            <tr className={options.striped ? "bg-gray-50" : ""}>
              <td className="px-3 py-2">Row 3, Col 1</td>
              <td className="px-3 py-2">Row 3, Col 2</td>
              <td className="px-3 py-2">Row 3, Col 3</td>
            </tr>
          </tbody>
        </table>
      )
    case "List (Ordered)":
      return (
        <ol
          type={options.type}
          start={options.start}
          reversed={options.reversed}
          className="list-decimal list-inside space-y-1 w-64"
        >
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
          <li>Fourth item</li>
        </ol>
      )
    case "List (Unordered)":
      const listStyles = {
        disc: "list-disc",
        circle: "list-circle",
        square: "list-square",
        none: "list-none",
      } as const
      const listStyleClass = listStyles[options.style as keyof typeof listStyles] || "list-disc"

      return (
        <ul className={`${listStyleClass} list-inside space-y-1 w-64`}>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
          <li>Fourth item</li>
        </ul>
      )
    case "Image":
      return (
        <img
          src={options.src || "/placeholder.svg"}
          alt={options.alt}
          width={options.width}
          height={options.height}
          loading={options.loading}
          className="border border-gray-300 rounded"
        />
      )
    case "Video":
      return (
        <video
          width={options.width}
          height={options.height}
          controls={options.controls}
          autoPlay={options.autoplay}
          loop={options.loop}
          muted={options.muted}
          className="border border-gray-300 rounded"
        >
          <source src="/placeholder-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    case "Audio":
      return (
        <audio
          controls={options.controls}
          autoPlay={options.autoplay}
          loop={options.loop}
          muted={options.muted}
          className="w-64"
        >
          <source src="/placeholder-audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )
    case "Canvas":
      return (
        <canvas
          width={options.width}
          height={options.height}
          className="border border-gray-300 bg-white"
          style={{
            background:
              "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        >
          Canvas not supported
        </canvas>
      )
    case "SVG":
      return (
        <svg width={options.width} height={options.height} viewBox={options.viewBox} className="border border-gray-300">
          <circle cx="100" cy="100" r="50" fill="#3b82f6" />
          <rect x="75" y="75" width="50" height="50" fill="#ef4444" opacity="0.7" />
        </svg>
      )
    case "Iframe":
      return (
        <iframe
          src="about:blank"
          width={options.width}
          height={options.height}
          className="border border-gray-300 bg-gray-100"
          title="Example iframe"
        >
          <div className="p-4 text-center text-gray-500">Iframe content would load here</div>
        </iframe>
      )
    case "Map":
      return (
        <div className="relative">
          <img
            src="/placeholder.svg?height=200&width=300&text=Image+Map"
            alt="Image map example"
            useMap="#imagemap"
            className="border border-gray-300"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Clickable areas defined
          </div>
        </div>
      )
    case "Object":
      return (
        <div
          className="border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500"
          style={{ width: options.width, height: options.height }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm">Object: {options.type}</div>
          </div>
        </div>
      )
    case "Embed":
      return (
        <div
          className="border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500"
          style={{ width: options.width, height: options.height }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🔌</div>
            <div className="text-sm">Embedded Content</div>
          </div>
        </div>
      )
    case "Output":
      return (
        <div className="w-64 p-4 border border-gray-300 rounded bg-gray-50">
          <div className="mb-2 text-sm">
            <label>
              Input 1: <input type="number" defaultValue="10" className="ml-2 px-2 py-1 border rounded w-16" />
            </label>
          </div>
          <div className="mb-2 text-sm">
            <label>
              Input 2: <input type="number" defaultValue="5" className="ml-2 px-2 py-1 border rounded w-16" />
            </label>
          </div>
          <div className="text-sm font-medium">
            Result: <output className="ml-2 px-2 py-1 bg-white border rounded">{options.value}</output>
          </div>
        </div>
      )
    case "Datalist":
      return (
        <div className="w-64">
          <input
            list="suggestions"
            placeholder="Type to see suggestions..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <datalist id="suggestions">
            <option value="Apple" />
            <option value="Banana" />
            <option value="Cherry" />
            <option value="Date" />
          </datalist>
          <div className="mt-2 text-xs text-gray-500">Datalist provides autocomplete suggestions</div>
        </div>
      )
    case "Keygen":
      return (
        <div className="w-64 p-4 border border-gray-300 rounded bg-yellow-50">
          <div className="text-sm font-medium mb-2">Key Generator (Deprecated)</div>
          <div className="text-xs text-gray-600 mb-2">
            Key Type: {options.keytype}, Size: {options.keysize}
          </div>
          <div className="text-xs text-orange-600">
            ⚠️ This element is deprecated and not supported in modern browsers
          </div>
        </div>
      )
    case "Track":
      return (
        <div className="w-64 p-3 border border-gray-300 rounded bg-gray-50">
          <div className="text-sm font-medium mb-1">Video Track</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Kind: {options.kind}</div>
            <div>Language: {options.srclang}</div>
            <div>Label: {options.label}</div>
            <div>Source: {options.src}</div>
          </div>
        </div>
      )
    case "Source":
      return (
        <div className="w-64 p-3 border border-gray-300 rounded bg-gray-50">
          <div className="text-sm font-medium mb-1">Media Source</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Source: {options.src}</div>
            <div>Type: {options.type}</div>
            {options.media && <div>Media Query: {options.media}</div>}
          </div>
        </div>
      )
    case "Picture":
      return (
        <picture>
          <source media="(min-width: 800px)" srcSet="/placeholder.svg?height=200&width=400&text=Desktop" />
          <source media="(min-width: 400px)" srcSet="/placeholder.svg?height=150&width=300&text=Tablet" />
          <img
            src="/placeholder.svg?height=100&width=200&text=Mobile"
            alt={options.alt}
            className="border border-gray-300"
          />
        </picture>
      )
    case "Figure":
      return (
        <figure className="text-center">
          <img
            src="/placeholder.svg?height=200&width=300&text=Figure+Image"
            alt="Figure"
            className="border border-gray-300 mb-2"
          />
          <figcaption className="text-sm text-gray-600 italic">{options.caption}</figcaption>
        </figure>
      )
    case "Mark":
      return (
        <p className="w-64">
          This is some text with <mark className="bg-yellow-200 px-1">{options.children}</mark> in the middle.
        </p>
      )
    case "Time":
      return (
        <p className="w-64">
          Published on{" "}
          <time dateTime={options.datetime} className="font-medium text-blue-600">
            {options.children}
          </time>
        </p>
      )
    case "Data":
      return (
        <p className="w-64">
          Item:{" "}
          <data value={options.value} className="font-medium text-green-600">
            {options.children}
          </data>
        </p>
      )
    case "Web Components":
      return (
        <div className="w-64 p-4 border border-gray-300 rounded bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="text-sm font-medium mb-2">Custom Web Component</div>
          <div className="text-xs text-gray-600 mb-2">Shadow DOM: {options.shadowMode}</div>
          <div className="p-3 bg-white rounded border-2 border-dashed border-purple-300">
            <div className="text-sm">🔮 Custom Element</div>
            <div className="text-xs text-gray-500 mt-1">Attribute: {options.customAttribute}</div>
          </div>
        </div>
      )

    case "Intersection Observer":
      return (
        <div className="w-64 h-48 border border-gray-300 rounded overflow-auto">
          <div className="h-32 bg-gray-100 flex items-center justify-center text-sm text-gray-600">
            Scroll down to see intersection
          </div>
          <div className="h-16 bg-green-100 border-2 border-green-300 flex items-center justify-center text-sm font-medium">
            🎯 Target Element (Visible)
          </div>
          <div className="h-32 bg-gray-100 flex items-center justify-center text-sm text-gray-600">
            Threshold: {options.threshold * 100}%
          </div>
        </div>
      )

    case "Drag and Drop":
      return (
        <div className="w-64 space-y-4">
          <div className="p-4 bg-blue-100 border-2 border-blue-300 rounded cursor-move text-center">
            🔄 Draggable Item
            <div className="text-xs text-gray-600 mt-1">Effect: {options.dropEffect}</div>
          </div>
          <div className="p-4 border-2 border-dashed border-gray-300 rounded text-center text-gray-600">
            📥 Drop Zone
            <div className="text-xs mt-1">Drop items here</div>
          </div>
        </div>
      )

    case "Geolocation":
      return (
        <div className="w-64 p-4 border border-gray-300 rounded">
          <div className="text-sm font-medium mb-3">📍 Geolocation API</div>
          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-3">
            Get Location
          </button>
          <div className="text-xs text-gray-600 space-y-1">
            <div>High Accuracy: {options.enableHighAccuracy ? "Yes" : "No"}</div>
            <div>Timeout: {options.timeout}ms</div>
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <div>Lat: 40.7128</div>
              <div>Lng: -74.0060</div>
            </div>
          </div>
        </div>
      )

    case "File API":
      return (
        <div className="w-64 p-4 border border-gray-300 rounded">
          <div className="text-sm font-medium mb-3">📁 File API</div>
          <input type="file" accept={options.accept} multiple={options.multiple} className="w-full mb-3 text-sm" />
          <div className="text-xs text-gray-600 space-y-1">
            <div>Accept: {options.accept}</div>
            <div>Multiple: {options.multiple ? "Yes" : "No"}</div>
            <div>Read as: {options.readAs}</div>
          </div>
          <div className="mt-3 p-2 bg-gray-100 rounded text-xs">File preview area</div>
        </div>
      )

    case "Local Storage":
      return (
        <div className="w-64 p-4 border border-gray-300 rounded">
          <div className="text-sm font-medium mb-3">💾 {options.storageType}</div>
          <div className="space-y-2">
            <input placeholder="Enter value" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
            <div className="flex space-x-2">
              <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs">Save</button>
              <button className="flex-1 px-2 py-1 bg-gray-600 text-white rounded text-xs">Load</button>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600">Key: {options.key}</div>
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs">Stored value: "demo data"</div>
        </div>
      )
    default:
      return <div>Component preview not implemented</div>
  }
}

function MUIPreview({ component, options }: ComponentPreviewProps) {
  // Note: In a real implementation, you would import and use actual MUI components
  // For this demo, we'll create styled approximations
  switch (component.name) {
    case "Button":
      const getButtonStyles = () => {
        const baseStyles = "px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
        const variantStyles = {
          text: "text-blue-600 hover:bg-blue-50",
          outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50",
          contained: "bg-blue-600 text-white hover:bg-blue-700",
        }
        const sizeStyles = {
          small: "px-2 py-1 text-sm",
          medium: "px-4 py-2",
          large: "px-6 py-3 text-lg",
        }
        const colorStyles = {
          primary: options.variant === "contained" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-600",
          secondary:
            options.variant === "contained" ? "bg-purple-600 hover:bg-purple-700" : "text-purple-600 border-purple-600",
          success:
            options.variant === "contained" ? "bg-green-600 hover:bg-green-700" : "text-green-600 border-green-600",
          error: options.variant === "contained" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-600",
          info: options.variant === "contained" ? "bg-cyan-600 hover:bg-cyan-700" : "text-cyan-600 border-cyan-600",
          warning:
            options.variant === "contained" ? "bg-orange-600 hover:bg-orange-700" : "text-orange-600 border-orange-600",
        }
        return `${baseStyles} ${variantStyles[options.variant as keyof typeof variantStyles]} ${sizeStyles[options.size as keyof typeof sizeStyles]} ${options.fullWidth ? "w-full" : ""}`
      }

      return (
        <button disabled={options.disabled} className={getButtonStyles()}>
          {options.children}
        </button>
      )
    case "TextField":
      const getTextFieldStyles = () => {
        const baseStyles = "w-64 px-3 py-2 focus:outline-none disabled:opacity-50"
        const variantStyles = {
          outlined: "border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          filled: "bg-gray-100 border-0 border-b-2 border-gray-300 rounded-t-md focus:border-blue-500",
          standard: "border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent",
        }
        const sizeStyles = {
          small: "py-1 text-sm",
          medium: "py-2",
        }
        return `${baseStyles} ${variantStyles[options.variant as keyof typeof variantStyles]} ${sizeStyles[options.size as keyof typeof sizeStyles]}`
      }

      return (
        <div className="w-64">
          {options.label && <label className="block text-sm font-medium text-gray-700 mb-1">{options.label}</label>}
          {options.multiline ? (
            <textarea
              placeholder={options.placeholder}
              disabled={options.disabled}
              rows={options.rows}
              className={getTextFieldStyles()}
            />
          ) : (
            <input
              placeholder={options.placeholder}
              disabled={options.disabled}
              required={options.required}
              className={getTextFieldStyles()}
            />
          )}
        </div>
      )
    case "Chip":
      const getChipStyles = () => {
        const baseStyles = "inline-flex items-center rounded-full font-medium"
        const variantStyles = {
          filled: "bg-gray-200 text-gray-800",
          outlined: "border border-gray-300 text-gray-700 bg-transparent",
        }
        const sizeStyles = {
          small: "px-2 py-1 text-xs",
          medium: "px-3 py-1 text-sm",
        }
        const colorStyles = {
          default: options.variant === "filled" ? "bg-gray-200 text-gray-800" : "border-gray-300 text-gray-700",
          primary: options.variant === "filled" ? "bg-blue-100 text-blue-800" : "border-blue-300 text-blue-700",
          secondary:
            options.variant === "filled" ? "bg-purple-100 text-purple-800" : "border-purple-300 text-purple-700",
          success: options.variant === "filled" ? "bg-green-100 text-green-800" : "border-green-300 text-green-700",
          error: options.variant === "filled" ? "bg-red-100 text-red-800" : "border-red-300 text-red-700",
          info: options.variant === "filled" ? "bg-cyan-100 text-cyan-800" : "border-cyan-300 text-cyan-700",
          warning: options.variant === "filled" ? "bg-orange-100 text-orange-800" : "border-orange-300 text-orange-700",
        }
        return `${baseStyles} ${sizeStyles[options.size as keyof typeof sizeStyles]} ${colorStyles[options.color as keyof typeof colorStyles]} ${options.clickable ? "cursor-pointer hover:opacity-80" : ""}`
      }

      return (
        <span className={getChipStyles()}>
          {options.label}
          {options.deletable && <span className="ml-1 cursor-pointer">×</span>}
        </span>
      )
    case "Card":
      const elevationShadow =
        {
          0: "shadow-none",
          1: "shadow-sm",
          2: "shadow",
          3: "shadow-md",
          4: "shadow-lg",
          5: "shadow-xl",
        }[Math.min(5, options.elevation)] || "shadow"

      return (
        <div
          className={`w-80 bg-white rounded-lg ${options.variant === "outlined" ? "border border-gray-300" : elevationShadow}`}
        >
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{options.title}</h3>
          </div>
          <div className="p-4">
            <p className="text-gray-600">{options.content}</p>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Action</button>
          </div>
        </div>
      )
    case "Avatar":
      const avatarSizes = {
        small: "h-8 w-8",
        medium: "h-12 w-12",
        large: "h-16 w-16",
      }
      const avatarShapes = {
        circular: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-none",
      }

      return (
        <div
          className={`${avatarSizes[options.size as keyof typeof avatarSizes]} ${avatarShapes[options.variant as keyof typeof avatarShapes]} bg-gray-300 flex items-center justify-center text-gray-600 font-medium overflow-hidden`}
        >
          {options.src ? (
            <img src={options.src || "/placeholder.svg"} alt={options.alt} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">{options.children}</span>
          )}
        </div>
      )
    case "Badge":
      const badgeColors = {
        default: "bg-gray-500",
        primary: "bg-blue-500",
        secondary: "bg-purple-500",
        error: "bg-red-500",
        info: "bg-cyan-500",
        success: "bg-green-500",
        warning: "bg-orange-500",
      }

      return (
        <div className="relative inline-block">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          {options.variant === "dot" ? (
            <div
              className={`absolute -top-1 -right-1 w-3 h-3 ${badgeColors[options.color as keyof typeof badgeColors]} rounded-full`}
            ></div>
          ) : (
            <div
              className={`absolute -top-1 -right-1 min-w-5 h-5 ${badgeColors[options.color as keyof typeof badgeColors]} text-white text-xs rounded-full flex items-center justify-center px-1`}
            >
              {options.badgeContent}
            </div>
          )}
        </div>
      )
    case "Checkbox":
      const checkboxColors = {
        primary: "text-blue-600 focus:ring-blue-500",
        secondary: "text-purple-600 focus:ring-purple-500",
        success: "text-green-600 focus:ring-green-500",
        error: "text-red-600 focus:ring-red-500",
        info: "text-cyan-600 focus:ring-cyan-500",
        warning: "text-orange-600 focus:ring-orange-500",
      }
      const checkboxSizes = {
        small: "h-3 w-3",
        medium: "h-4 w-4",
        large: "h-5 w-5",
      }

      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.checked}
            disabled={options.disabled}
            className={`${checkboxSizes[options.size as keyof typeof checkboxSizes]} ${checkboxColors[options.color as keyof typeof checkboxColors]} rounded border-gray-300`}
            readOnly
          />
          <label className="text-sm text-gray-700">{options.label}</label>
        </div>
      )
    case "Switch":
      const switchColors = {
        primary: options.checked ? "bg-blue-600" : "bg-gray-300",
        secondary: options.checked ? "bg-purple-600" : "bg-gray-300",
        success: options.checked ? "bg-green-600" : "bg-gray-300",
        error: options.checked ? "bg-red-600" : "bg-gray-300",
        info: options.checked ? "bg-cyan-600" : "bg-gray-300",
        warning: options.checked ? "bg-orange-600" : "bg-gray-300",
      }
      const switchSizes = {
        small: { container: "h-4 w-7", thumb: "h-3 w-3" },
        medium: { container: "h-5 w-9", thumb: "h-4 w-4" },
      }
      const size = switchSizes[options.size as keyof typeof switchSizes]

      return (
        <div className="flex items-center space-x-2">
          <div
            className={`${size.container} ${switchColors[options.color as keyof typeof switchColors]} rounded-full p-1 transition-colors ${options.disabled ? "opacity-50" : ""}`}
          >
            <div
              className={`${size.thumb} bg-white rounded-full shadow-md transform transition-transform ${options.checked ? "translate-x-full" : ""}`}
            ></div>
          </div>
          <label className="text-sm text-gray-700">{options.label}</label>
        </div>
      )
    case "Radio":
      const radioColors = {
        primary: "text-blue-600 focus:ring-blue-500",
        secondary: "text-purple-600 focus:ring-purple-500",
        success: "text-green-600 focus:ring-green-500",
        error: "text-red-600 focus:ring-red-500",
        info: "text-cyan-600 focus:ring-cyan-500",
        warning: "text-orange-600 focus:ring-orange-500",
      }
      const radioSizes = {
        small: "h-3 w-3",
        medium: "h-4 w-4",
        large: "h-5 w-5",
      }

      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="radio-group"
              value="option1"
              checked={options.value === "option1"}
              disabled={options.disabled}
              className={`${radioSizes[options.size as keyof typeof radioSizes]} ${radioColors[options.color as keyof typeof radioColors]} border-gray-300`}
              readOnly
            />
            <label className="text-sm text-gray-700">Option 1</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="radio-group"
              value="option2"
              checked={options.value === "option2"}
              disabled={options.disabled}
              className={`${radioSizes[options.size as keyof typeof radioSizes]} ${radioColors[options.color as keyof typeof radioColors]} border-gray-300`}
              readOnly
            />
            <label className="text-sm text-gray-700">Option 2</label>
          </div>
        </div>
      )
    case "Slider":
      const sliderColors = {
        primary: "accent-blue-600",
        secondary: "accent-purple-600",
      }
      const sliderSizes = {
        small: "h-1",
        medium: "h-2",
      }

      return (
        <div className="w-64 px-2">
          <input
            type="range"
            min={options.min}
            max={options.max}
            step={options.step}
            value={options.value}
            disabled={options.disabled}
            className={`w-full ${sliderSizes[options.size as keyof typeof sliderSizes]} bg-gray-200 rounded-lg appearance-none cursor-pointer ${sliderColors[options.color as keyof typeof sliderColors]}`}
            readOnly
          />
          {options.marks && (
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{options.min}</span>
              <span>{Math.floor((options.min + options.max) / 2)}</span>
              <span>{options.max}</span>
            </div>
          )}
          {options.valueLabelDisplay !== "off" && (
            <div className="text-center text-sm text-gray-600 mt-1">{options.value}</div>
          )}
        </div>
      )
    case "LinearProgress":
      const progressColors = {
        primary: "bg-blue-600",
        secondary: "bg-purple-600",
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-cyan-600",
        warning: "bg-orange-600",
      }

      return (
        <div className="w-64">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            {options.variant === "indeterminate" ? (
              <div
                className={`h-full ${progressColors[options.color as keyof typeof progressColors]} animate-pulse`}
                style={{ width: "100%" }}
              ></div>
            ) : (
              <div
                className={`h-full ${progressColors[options.color as keyof typeof progressColors]} transition-all duration-300`}
                style={{ width: `${Math.min(100, Math.max(0, options.value))}%` }}
              ></div>
            )}
          </div>
        </div>
      )
    case "CircularProgress":
      const circularColors = {
        primary: "text-blue-500",
        secondary: "text-purple-500",
        success: "text-green-500",
        error: "text-red-500",
        info: "text-cyan-500",
        warning: "text-orange-500",
      }

      return (
        <div className="flex items-center justify-center p-4">
          <div
            className={`${circularColors[options.color as keyof typeof circularColors]} ${options.variant === "indeterminate" ? "animate-spin" : ""}`}
            style={{ width: options.size, height: options.size }}
          >
            <svg className="w-full h-full" viewBox="0 0 24 24">
              {/* Background circle */}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={options.thickness}
                fill="none"
                strokeLinecap="round"
                className="opacity-20"
              />
              {/* Progress circle */}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={options.thickness}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={
                  options.variant === "determinate" ? `${(options.value / 100) * 62.83} 62.83` : "15.7 62.83"
                }
                strokeDashoffset={options.variant === "determinate" ? "0" : undefined}
                className={options.variant === "indeterminate" ? "animate-spin" : ""}
                style={{
                  transformOrigin: "center",
                  transform: "rotate(-90deg)"
                }}
              />
            </svg>
          </div>
          {options.variant === "determinate" && (
            <div className="absolute text-sm font-medium text-gray-700">
              {options.value}%
            </div>
          )}
        </div>
      )
    case "Alert":
      const alertStyles = {
        error: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "⚠️" },
        warning: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "⚠️" },
        info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "ℹ️" },
        success: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "✅" },
      }
      const style = alertStyles[options.severity as keyof typeof alertStyles]

      return (
        <div
          className={`w-80 p-4 rounded-lg border ${style.bg} ${style.border} ${style.text} ${options.variant === "filled" ? "text-white bg-opacity-90" : ""} ${options.variant === "outlined" ? "bg-transparent" : ""}`}
        >
          <div className="flex items-start">
            <span className="mr-2">{style.icon}</span>
            <div className="flex-1">
              <p>{options.children}</p>
              {options.onClose && <button className="ml-auto text-current hover:opacity-75">×</button>}
            </div>
          </div>
        </div>
      )
    case "Snackbar":
      const snackbarPositions = {
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "top-right": "top-4 right-4",
      }

      return (
        <div className="relative w-80 h-32">
          {options.open && (
            <div
              className={`absolute ${snackbarPositions[options.anchorOrigin as keyof typeof snackbarPositions]} bg-gray-800 text-white px-4 py-2 rounded shadow-lg`}
            >
              <span>{options.message}</span>
              <button className="ml-2 text-white hover:opacity-75">×</button>
            </div>
          )}
        </div>
      )
    case "Tooltip":
      return (
        <div className="relative group">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{options.triggerText}</button>
          <div
            className={`absolute ${options.placement.includes("top") ? "bottom-full mb-2" : options.placement.includes("bottom") ? "top-full mt-2" : options.placement.includes("left") ? "right-full mr-2" : "left-full ml-2"} ${options.placement.includes("start") ? "left-0" : options.placement.includes("end") ? "right-0" : "left-1/2 transform -translate-x-1/2"} px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}
          >
            {options.title}
            {options.arrow && (
              <div
                className={`absolute ${options.placement.includes("top") ? "top-full" : options.placement.includes("bottom") ? "bottom-full" : options.placement.includes("left") ? "left-full" : "right-full"} left-1/2 transform -translate-x-1/2 w-0 h-0 border-4 border-transparent ${options.placement.includes("top") ? "border-t-gray-900" : options.placement.includes("bottom") ? "border-b-gray-900" : options.placement.includes("left") ? "border-l-gray-900" : "border-r-gray-900"}`}
              ></div>
            )}
          </div>
        </div>
      )
    case "Tabs":
      const tabsOrientation = options.orientation === "vertical" ? "flex-col" : "flex-row"

      return (
        <div className={`w-80 ${options.orientation === "vertical" ? "flex" : ""}`}>
          <div
            className={`flex ${tabsOrientation} ${options.orientation === "vertical" ? "border-r border-gray-200 w-32" : "border-b border-gray-200"}`}
          >
            <button
              className={`px-4 py-2 text-sm font-medium ${options.value === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} ${options.variant === "fullWidth" ? "flex-1" : ""}`}
            >
              Tab 1
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${options.value === 1 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} ${options.variant === "fullWidth" ? "flex-1" : ""}`}
            >
              Tab 2
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${options.value === 2 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} ${options.variant === "fullWidth" ? "flex-1" : ""}`}
            >
              Tab 3
            </button>
          </div>
          <div className={`p-4 ${options.orientation === "vertical" ? "flex-1" : ""}`}>
            <p>Tab {options.value + 1} content</p>
          </div>
        </div>
      )
    case "Accordion":
      return (
        <div className="w-80 border border-gray-200 rounded-md">
          <div className="border-b border-gray-200">
            <button
              className={`w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-between ${options.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span>{options.summary}</span>
              <span>{options.expanded ? "−" : "+"}</span>
            </button>
            {options.expanded && (
              <div className="px-4 py-3 text-gray-600 border-t border-gray-200">
                <p>{options.details}</p>
              </div>
            )}
          </div>
        </div>
      )
    case "Dialog":
      const dialogSizes = {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
      }

      return (
        <div className="relative w-80 h-64">
          {options.open && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div
                className={`bg-white rounded-lg shadow-xl ${dialogSizes[options.maxWidth as keyof typeof dialogSizes]} ${options.fullWidth ? "w-full" : ""} ${options.fullScreen ? "w-full h-full rounded-none" : "max-h-96"} overflow-hidden`}
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">{options.title}</h2>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-600">{options.content}</p>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">OK</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    case "Autocomplete":
      return (
        <div className="w-64">
          <div className="relative">
            <input
              placeholder="Search options..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-auto">
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">Option 1</div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">Option 2</div>
              <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">Option 3</div>
            </div>
          </div>
        </div>
      )
    case "Rating":
      return (
        <div className="flex items-center space-x-1">
          {Array.from({ length: options.max }, (_, i) => (
            <span
              key={i}
              className={`text-${options.size === "small" ? "sm" : options.size === "large" ? "2xl" : "xl"} ${i < options.value ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
          {!options.readOnly && <span className="ml-2 text-sm text-gray-600"></span>}
        </div>
      )
    case "Stepper":
      return (
        <div className="w-80">
          <div className={`flex ${options.orientation === "vertical" ? "flex-col" : "items-center justify-between"}`}>
            {[1, 2, 3].map((step, index) => (
              <div key={step} className={`flex items-center ${options.orientation === "vertical" ? "mb-4" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= options.activeStep ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {options.orientation === "vertical" ? (
                  <div className="ml-4">
                    <div className="font-medium">Step {step}</div>
                    <div className="text-sm text-gray-600">Step description</div>
                  </div>
                ) : (
                  index < 2 && <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    case "SpeedDial":
      return (
        <div className="relative w-80 h-48 flex items-end justify-end p-4">
          <div className="relative">
            <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center">
              +
            </button>
            <div
              className={`absolute ${options.direction === "up" ? "bottom-16" : options.direction === "down" ? "top-16" : options.direction === "left" ? "right-16" : "left-16"} flex ${options.direction === "up" || options.direction === "down" ? "flex-col" : "flex-row"} space-${options.direction === "up" || options.direction === "down" ? "y" : "x"}-2`}
            >
              <button className="w-10 h-10 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 flex items-center justify-center text-sm">
                📧
              </button>
              <button className="w-10 h-10 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 flex items-center justify-center text-sm">
                📞
              </button>
              <button className="w-10 h-10 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 flex items-center justify-center text-sm">
                📝
              </button>
            </div>
          </div>
        </div>
      )
    case "Timeline":
      return (
        <div className={`w-80 ${options.align === "alternate" ? "relative" : ""}`}>
          {[1, 2, 3].map((item, index) => (
            <div key={item} className={`flex ${options.align === "right" ? "flex-row-reverse" : ""} items-center mb-4`}>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                {index < 2 && <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>}
              </div>
              <div className={`${options.align === "right" ? "mr-4" : "ml-4"} flex-1`}>
                <div className="text-sm font-medium">Event {item}</div>
                <div className="text-xs text-gray-600">Timeline content for event {item}</div>
              </div>
            </div>
          ))}
        </div>
      )
    case "TreeView":
      return (
        <div className="w-64 border border-gray-300 rounded p-2">
          <div className="space-y-1">
            <div className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded">
              <span className="mr-1">📁</span>
              <span className="text-sm">Root Folder</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded">
                <span className="mr-1">📁</span>
                <span className="text-sm">Subfolder 1</span>
              </div>
              <div className="ml-4">
                <div className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded">
                  <span className="mr-1">📄</span>
                  <span className="text-sm">File 1.txt</span>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded">
                <span className="mr-1">📄</span>
                <span className="text-sm">File 2.txt</span>
              </div>
            </div>
          </div>
        </div>
      )
    case "Masonry":
      return (
        <div className={`w-80 grid grid-cols-${options.columns} gap-${options.spacing}`}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-200 rounded p-4" style={{ height: `${80 + (item % 3) * 40}px` }}>
              <div className="text-sm font-medium">Item {item}</div>
              <div className="text-xs text-gray-600 mt-1">Content with varying height</div>
            </div>
          ))}
        </div>
      )
    case "LoadingButton":
      return (
        <button
          className={`px-4 py-2 rounded font-medium transition-colors ${
            options.variant === "contained"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : options.variant === "outlined"
                ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
                : "text-blue-600 hover:bg-blue-50"
          } ${options.loading ? "opacity-75 cursor-not-allowed" : ""}`}
          disabled={options.loading}
        >
          <div className="flex items-center">
            {options.loading && options.loadingPosition === "start" && (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            )}
            <span>{options.children}</span>
            {options.loading && options.loadingPosition === "end" && (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2"></div>
            )}
            {options.loading && options.loadingPosition === "center" && (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2"></div>
            )}
          </div>
        </button>
      )
    case "DatePicker":
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">{options.label}</label>
          <div className="relative">
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              disabled={options.disabled}
              readOnly={options.readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</div>
          </div>
        </div>
      )
    case "TimePicker":
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">{options.label}</label>
          <div className="relative">
            <input
              type="text"
              placeholder={options.ampm ? "HH:MM AM/PM" : "HH:MM"}
              disabled={options.disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🕐</div>
          </div>
        </div>
      )
    case "DataGrid":
      return (
        <div className="w-full max-w-2xl border border-gray-300 rounded">
          <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center">
            <div className="text-sm font-medium">Data Grid ({options.pageSize} rows)</div>
            {options.checkboxSelection && <input type="checkbox" className="ml-auto mr-2" />}
          </div>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {options.checkboxSelection && (
                  <th className="w-8 p-2">
                    <input type="checkbox" />
                  </th>
                )}
                <th className="text-left p-2 text-sm font-medium">ID</th>
                <th className="text-left p-2 text-sm font-medium">Name</th>
                <th className="text-left p-2 text-sm font-medium">Status</th>
                <th className="text-left p-2 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(options.pageSize, 3) }, (_, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                  {options.checkboxSelection && (
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>
                  )}
                  <td className="p-2 text-sm">{i + 1}</td>
                  <td className="p-2 text-sm">Item {i + 1}</td>
                  <td className="p-2 text-sm">Active</td>
                  <td className="p-2 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "Skeleton":
      const skeletonVariants = {
        text: "h-4 rounded",
        rectangular: "h-20 rounded",
        rounded: "h-20 rounded-lg",
        circular: "rounded-full",
      }

      return (
        <div
          className={`bg-gray-300 ${options.animation === "wave" ? "animate-pulse" : options.animation === "pulse" ? "animate-bounce" : ""} ${skeletonVariants[options.variant as keyof typeof skeletonVariants]}`}
          style={{
            width: options.variant === "circular" ? options.height : options.width,
            height: options.height,
          }}
        ></div>
      )
    case "Backdrop":
      return (
        <div className="relative w-80 h-48">
          {options.open && (
            <div
              className={`absolute inset-0 ${options.invisible ? "bg-transparent" : "bg-black bg-opacity-50"} flex items-center justify-center`}
            >
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-600">
            Content behind backdrop
          </div>
        </div>
      )
    case "SpeedDialAction":
      return (
        <div className="relative">
          <button className="w-10 h-10 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 flex items-center justify-center">
            ⚡
          </button>
          {options.tooltipOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
              {options.tooltipTitle}
            </div>
          )}
        </div>
      )
    case "ImageList":
      return (
        <div className={`grid grid-cols-${options.cols} gap-2 w-80`} style={{ gridAutoRows: `${options.rowHeight}px` }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="relative bg-gray-200 rounded overflow-hidden">
              <img
                src={`/placeholder.svg?height=${options.rowHeight}&width=200&text=Image+${i + 1}`}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <div className="text-sm font-medium">Image {i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      )
    case "BottomNavigation":
      return (
        <div className="w-80 bg-white border-t border-gray-300">
          <div className="flex">
            {["Home", "Search", "Profile"].map((label, index) => (
              <button
                key={label}
                className={`flex-1 py-3 px-2 text-center ${
                  index === options.value ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <div className="text-xl mb-1">{index === 0 ? "🏠" : index === 1 ? "🔍" : "👤"}</div>
                {options.showLabels && <div className="text-xs">{label}</div>}
              </button>
            ))}
          </div>
        </div>
      )
    case "Breadcrumbs":
      return (
        <nav className="flex items-center space-x-2 text-sm">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{options.separator}</span>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Category
          </a>
          <span className="text-gray-400">{options.separator}</span>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Subcategory
          </a>
          <span className="text-gray-400">{options.separator}</span>
          <span className="text-gray-600">Current Page</span>
        </nav>
      )
    case "Drawer":
      return (
        <div className="relative w-80 h-48 overflow-hidden">
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Open Drawer</button>
          </div>
          {options.open && (
            <div
              className={`absolute ${
                options.anchor === "left"
                  ? "left-0 top-0 h-full w-64"
                  : options.anchor === "right"
                    ? "right-0 top-0 h-full w-64"
                    : options.anchor === "top"
                      ? "top-0 left-0 w-full h-32"
                      : "bottom-0 left-0 w-full h-32"
              } bg-white border-r border-gray-300 shadow-lg`}
            >
              <div className="p-4">
                <div className="font-medium mb-2">Navigation</div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Menu Item 1</div>
                  <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Menu Item 2</div>
                  <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Menu Item 3</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    case "SwipeableDrawer":
      return (
        <div className="relative w-80 h-48 overflow-hidden">
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Swipe from edge to open</div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Toggle Drawer</button>
            </div>
          </div>
          {options.open && (
            <div
              className={`absolute ${
                options.anchor === "left"
                  ? "left-0 top-0 h-full w-64"
                  : options.anchor === "right"
                    ? "right-0 top-0 h-full w-64"
                    : options.anchor === "top"
                      ? "top-0 left-0 w-full h-32"
                      : "bottom-0 left-0 w-full h-32"
              } bg-white border border-gray-300 shadow-lg`}
            >
              <div className="p-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="font-medium mb-2">Swipeable Content</div>
                <div className="text-sm text-gray-600">Swipe to dismiss</div>
              </div>
            </div>
          )}
        </div>
      )
    case "Menu":
      return (
        <div className="relative">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Open Menu</button>
          {options.open && (
            <div className="absolute top-12 left-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-1 z-10">
              <div className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">Menu Item 1</div>
              <div className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">Menu Item 2</div>
              <div className="border-t border-gray-200 my-1"></div>
              <div className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">Menu Item 3</div>
            </div>
          )}
        </div>
      )
    case "Select":
      return (
        <div className="w-64">
          {options.label && <label className="block text-sm font-medium text-gray-700 mb-1">{options.label}</label>}
          <select
            multiple={options.multiple}
            disabled={options.disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
              options.variant === "filled"
                ? "bg-gray-100"
                : options.variant === "standard"
                  ? "border-0 border-b-2 rounded-none"
                  : ""
            }`}
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      )
    case "Virtualized List":
      return (
        <div className="w-64 border border-gray-300 rounded">
          <div className="p-2 bg-gray-100 border-b border-gray-300 text-sm font-medium">
            Virtual List ({options.itemCount} items)
          </div>
          <div style={{ height: options.height }} className="overflow-auto">
            {Array.from({ length: Math.min(10, options.itemCount) }, (_, i) => (
              <div
                key={i}
                className="flex items-center px-3 border-b border-gray-200 hover:bg-gray-50"
                style={{ height: options.itemSize }}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs mr-3">
                  {i + 1}
                </div>
                <div>
                  <div className="font-medium text-sm">Item {i + 1}</div>
                  <div className="text-xs text-gray-600">Virtual list item</div>
                </div>
              </div>
            ))}
            <div className="p-2 text-center text-xs text-gray-500">
              ... {options.itemCount - 10} more items (virtualized)
            </div>
          </div>
        </div>
      )

    case "Transfer List":
      return (
        <div className="flex space-x-4">
          <div className="w-48 border border-gray-300 rounded">
            <div className="p-2 bg-gray-100 border-b border-gray-300 text-sm font-medium">Available (3/5)</div>
            <div className="p-2 space-y-1">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Item 1</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                <span className="text-sm">Item 2</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Item 3</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs">→</button>
            <button className="px-2 py-1 bg-gray-600 text-white rounded text-xs">←</button>
          </div>
          <div className="w-48 border border-gray-300 rounded">
            <div className="p-2 bg-gray-100 border-b border-gray-300 text-sm font-medium">Selected (2/5)</div>
            <div className="p-2 space-y-1">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Item 4</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Item 5</span>
              </div>
            </div>
          </div>
        </div>
      )

    case "Floating Action Button":
      return (
        <div className="relative w-80 h-48 bg-gray-100 rounded">
          <div className="absolute bottom-4 right-4">
            <button
              className={`${
                options.size === "small" ? "w-10 h-10" : options.size === "large" ? "w-16 h-16" : "w-14 h-14"
              } bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center ${
                options.variant === "extended" ? "px-4 rounded-full" : ""
              }`}
            >
              {options.variant === "extended" ? (
                <span className="flex items-center">
                  <span className="mr-2">+</span>
                  <span>Add</span>
                </span>
              ) : (
                "+"
              )}
            </button>
          </div>
          <div className="p-4">
            <div className="text-sm text-gray-600">FAB positioned in bottom-right corner</div>
          </div>
        </div>
      )

    case "Pagination":
      return (
        <div className="flex items-center space-x-1">
          {options.showFirstButton && (
            <button className="px-2 py-1 border border-gray-300 rounded text-sm">First</button>
          )}
          <button className="px-2 py-1 border border-gray-300 rounded text-sm">‹</button>
          <button
            className={`px-3 py-1 rounded text-sm ${options.variant === "outlined" ? "border border-blue-600 text-blue-600" : "bg-blue-600 text-white"} ${options.shape === "rounded" ? "rounded-full" : ""}`}
          >
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm">3</button>
          <span className="px-2 text-sm text-gray-500">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm">{options.count}</button>
          <button className="px-2 py-1 border border-gray-300 rounded text-sm">›</button>
          {options.showLastButton && <button className="px-2 py-1 border border-gray-300 rounded text-sm">Last</button>}
        </div>
      )

    case "Infinite Scroll":
      return (
        <div className="w-64 h-64 border border-gray-300 rounded overflow-auto">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="p-3 border-b border-gray-200">
              <div className="font-medium text-sm">Item {i + 1}</div>
              <div className="text-xs text-gray-600">Infinite scroll content</div>
            </div>
          ))}
          {options.hasMore && (
            <div className="p-3 text-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-xs text-gray-600 mt-2">Loading more...</div>
            </div>
          )}
        </div>
      )

    case "Kanban Board":
      return (
        <div className="w-full max-w-4xl">
          <div className={`grid grid-cols-${options.columns} gap-4`}>
            {Array.from({ length: options.columns }, (_, colIndex) => (
              <div key={colIndex} className="bg-gray-100 rounded-lg p-3">
                <div className="font-medium text-sm mb-3">
                  {["To Do", "In Progress", "Done"][colIndex] || `Column ${colIndex + 1}`}
                </div>
                <div className="space-y-2">
                  {Array.from({ length: options.itemsPerColumn }, (_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-move hover:shadow-md"
                    >
                      <div className="font-medium text-sm">Task {itemIndex + 1}</div>
                      <div className="text-xs text-gray-600 mt-1">Description for task {itemIndex + 1}</div>
                      <div className="flex items-center mt-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                          U{itemIndex + 1}
                        </div>
                        <div className="ml-auto text-xs text-gray-500">{["Low", "Medium", "High"][itemIndex % 3]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    default:
      return <div>Component preview not implemented</div>
  }
}
