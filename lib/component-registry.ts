export interface ComponentOption {
  name: string
  type: "select" | "boolean" | "text" | "number"
  options?: string[]
  defaultValue: any
  description?: string
}

export interface ComponentVariation {
  name: string
  options: Record<string, any>
}

export interface ComponentInfo {
  name: string
  library: string
  description: string
  component: string
  imports: string[]
  options: ComponentOption[]
  variations?: ComponentVariation[]
}

export interface ComponentCategory {
  name: string
  icon: string
  components: ComponentInfo[]
}

export const componentRegistry: Record<string, ComponentCategory[]> = {
  "shadcn/ui": [
    {
      name: "Form Controls",
      icon: "📝",
      components: [
        {
          name: "Button",
          library: "shadcn/ui",
          description: "A clickable button component with multiple variants and sizes",
          component: "Button",
          imports: ['import { Button } from "@/components/ui/button"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
              defaultValue: "default",
              description: "Visual style variant",
            },
            {
              name: "size",
              type: "select",
              options: ["default", "sm", "lg", "icon"],
              defaultValue: "default",
              description: "Button size",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "Button",
              description: "Button text content",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable the button",
            },
          ],
          variations: [
            { name: "Primary", options: { variant: "default", size: "default", children: "Primary" } },
            { name: "Destructive", options: { variant: "destructive", size: "default", children: "Delete" } },
            { name: "Outline", options: { variant: "outline", size: "default", children: "Outline" } },
            { name: "Ghost", options: { variant: "ghost", size: "sm", children: "Ghost" } },
            { name: "Link", options: { variant: "link", size: "default", children: "Link" } },
          ],
        },
        {
          name: "Input",
          library: "shadcn/ui",
          description: "A text input field with various types and states",
          component: "Input",
          imports: ['import { Input } from "@/components/ui/input"'],
          options: [
            {
              name: "type",
              type: "select",
              options: ["text", "email", "password", "number", "search", "url"],
              defaultValue: "text",
              description: "Input type",
            },
            {
              name: "placeholder",
              type: "text",
              defaultValue: "Enter text...",
              description: "Placeholder text",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable the input",
            },
          ],
        },
        {
          name: "Textarea",
          library: "shadcn/ui",
          description: "Multi-line text input",
          component: "Textarea",
          imports: ['import { Textarea } from "@/components/ui/textarea"'],
          options: [
            {
              name: "placeholder",
              type: "text",
              defaultValue: "Type your message here...",
              description: "Placeholder text",
            },
            {
              name: "rows",
              type: "number",
              defaultValue: 4,
              description: "Number of rows",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable textarea",
            },
          ],
        },
        {
          name: "Select",
          library: "shadcn/ui",
          description: "Dropdown selection component",
          component: "Select",
          imports: [
            'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
          ],
          options: [
            {
              name: "placeholder",
              type: "text",
              defaultValue: "Select an option",
              description: "Placeholder text",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable select",
            },
          ],
        },
        {
          name: "Checkbox",
          library: "shadcn/ui",
          description: "Allow users to select multiple options",
          component: "Checkbox",
          imports: ['import { Checkbox } from "@/components/ui/checkbox"'],
          options: [
            {
              name: "checked",
              type: "boolean",
              defaultValue: false,
              description: "Checked state",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable checkbox",
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Accept terms and conditions",
              description: "Checkbox label",
            },
          ],
        },
        {
          name: "Switch",
          library: "shadcn/ui",
          description: "Toggle between two states",
          component: "Switch",
          imports: ['import { Switch } from "@/components/ui/switch"'],
          options: [
            {
              name: "checked",
              type: "boolean",
              defaultValue: false,
              description: "Switch state",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable switch",
            },
          ],
        },
        {
          name: "RadioGroup",
          library: "shadcn/ui",
          description: "Group of radio button options",
          component: "RadioGroup",
          imports: ['import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"'],
          options: [
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "vertical",
              description: "Group orientation",
            },
            {
              name: "defaultValue",
              type: "text",
              defaultValue: "option1",
              description: "Default selected value",
            },
          ],
        },
        {
          name: "Slider",
          library: "shadcn/ui",
          description: "Allow users to select a value from a range",
          component: "Slider",
          imports: ['import { Slider } from "@/components/ui/slider"'],
          options: [
            {
              name: "defaultValue",
              type: "number",
              defaultValue: 50,
              description: "Default slider value",
            },
            {
              name: "min",
              type: "number",
              defaultValue: 0,
              description: "Minimum value",
            },
            {
              name: "max",
              type: "number",
              defaultValue: 100,
              description: "Maximum value",
            },
            {
              name: "step",
              type: "number",
              defaultValue: 1,
              description: "Step increment",
            },
          ],
        },
        {
          name: "Toggle",
          library: "shadcn/ui",
          description: "Two-state toggle button",
          component: "Toggle",
          imports: ['import { Toggle } from "@/components/ui/toggle"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["default", "outline"],
              defaultValue: "default",
              description: "Toggle variant",
            },
            {
              name: "size",
              type: "select",
              options: ["default", "sm", "lg"],
              defaultValue: "default",
              description: "Toggle size",
            },
            {
              name: "pressed",
              type: "boolean",
              defaultValue: false,
              description: "Toggle state",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "Toggle",
              description: "Toggle text",
            },
          ],
        },
        {
          name: "ToggleGroup",
          library: "shadcn/ui",
          description: "Group of toggle buttons",
          component: "ToggleGroup",
          imports: ['import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"'],
          options: [
            {
              name: "type",
              type: "select",
              options: ["single", "multiple"],
              defaultValue: "single",
              description: "Selection type",
            },
            {
              name: "variant",
              type: "select",
              options: ["default", "outline"],
              defaultValue: "default",
              description: "Group variant",
            },
          ],
        },
        {
          name: "Combobox",
          library: "shadcn/ui",
          description: "Searchable select dropdown with autocomplete",
          component: "Combobox",
          imports: ['import { Combobox } from "@/components/ui/combobox"'],
          options: [
            {
              name: "searchable",
              type: "boolean",
              defaultValue: true,
              description: "Enable search",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: false,
              description: "Multiple selection",
            },
          ],
        },
        {
          name: "InputOTP",
          library: "shadcn/ui",
          description: "One-time password input component",
          component: "InputOTP",
          imports: ['import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"'],
          options: [
            {
              name: "maxLength",
              type: "number",
              defaultValue: 6,
              description: "Number of digits",
            },
          ],
        },
      ],
    },
    {
      name: "Data Display",
      icon: "📊",
      components: [
        {
          name: "Card",
          library: "shadcn/ui",
          description: "A flexible container for content",
          component: "Card",
          imports: [
            'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"',
          ],
          options: [
            {
              name: "title",
              type: "text",
              defaultValue: "Card Title",
              description: "Card title",
            },
            {
              name: "description",
              type: "text",
              defaultValue: "Card description goes here",
              description: "Card description",
            },
            {
              name: "content",
              type: "text",
              defaultValue: "This is the card content area.",
              description: "Card content",
            },
            {
              name: "showFooter",
              type: "boolean",
              defaultValue: true,
              description: "Show card footer",
            },
          ],
        },
        {
          name: "Badge",
          library: "shadcn/ui",
          description: "A small status indicator or label",
          component: "Badge",
          imports: ['import { Badge } from "@/components/ui/badge"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["default", "secondary", "destructive", "outline"],
              defaultValue: "default",
              description: "Badge variant",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "Badge",
              description: "Badge text",
            },
          ],
        },
        {
          name: "Avatar",
          library: "shadcn/ui",
          description: "Display user profile pictures or initials",
          component: "Avatar",
          imports: ['import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"'],
          options: [
            {
              name: "src",
              type: "text",
              defaultValue: "",
              description: "Avatar image URL",
            },
            {
              name: "fallback",
              type: "text",
              defaultValue: "JD",
              description: "Fallback initials",
            },
          ],
        },
        {
          name: "Table",
          library: "shadcn/ui",
          description: "Data table with sorting and styling",
          component: "Table",
          imports: [
            'import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"',
          ],
          options: [
            {
              name: "caption",
              type: "text",
              defaultValue: "A list of your recent invoices",
              description: "Table caption",
            },
            {
              name: "striped",
              type: "boolean",
              defaultValue: false,
              description: "Striped rows",
            },
          ],
        },
        {
          name: "Chart",
          library: "shadcn/ui",
          description: "Recharts-based chart components for data visualization",
          component: "Chart",
          imports: ['import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"'],
          options: [
            {
              name: "type",
              type: "select",
              options: ["line", "bar", "area", "pie", "radar"],
              defaultValue: "line",
              description: "Chart type",
            },
            {
              name: "showGrid",
              type: "boolean",
              defaultValue: true,
              description: "Show grid lines",
            },
          ],
        },
        {
          name: "DataTable",
          library: "shadcn/ui",
          description: "Advanced data table with sorting, filtering, and pagination",
          component: "DataTable",
          imports: ['import { DataTable } from "@/components/ui/data-table"'],
          options: [
            {
              name: "sortable",
              type: "boolean",
              defaultValue: true,
              description: "Enable sorting",
            },
            {
              name: "filterable",
              type: "boolean",
              defaultValue: true,
              description: "Enable filtering",
            },
            {
              name: "pagination",
              type: "boolean",
              defaultValue: true,
              description: "Enable pagination",
            },
          ],
        },
      ],
    },
    {
      name: "Navigation",
      icon: "🧭",
      components: [
        {
          name: "Tabs",
          library: "shadcn/ui",
          description: "Organize content into multiple panels",
          component: "Tabs",
          imports: ['import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"'],
          options: [
            {
              name: "defaultValue",
              type: "text",
              defaultValue: "tab1",
              description: "Default active tab",
            },
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Tabs orientation",
            },
          ],
        },
        {
          name: "Breadcrumb",
          library: "shadcn/ui",
          description: "Navigation breadcrumb trail",
          component: "Breadcrumb",
          imports: [
            'import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"',
          ],
          options: [
            {
              name: "separator",
              type: "select",
              options: ["/", ">", "•", "→"],
              defaultValue: "/",
              description: "Breadcrumb separator",
            },
          ],
        },
        {
          name: "NavigationMenu",
          library: "shadcn/ui",
          description: "Accessible navigation menu with dropdowns",
          component: "NavigationMenu",
          imports: [
            'import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"',
          ],
          options: [
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Menu orientation",
            },
          ],
        },
        {
          name: "Pagination",
          library: "shadcn/ui",
          description: "Pagination controls for data navigation",
          component: "Pagination",
          imports: [
            'import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"',
          ],
          options: [
            {
              name: "currentPage",
              type: "number",
              defaultValue: 1,
              description: "Current page number",
            },
            {
              name: "totalPages",
              type: "number",
              defaultValue: 10,
              description: "Total number of pages",
            },
          ],
        },
        {
          name: "Sidebar",
          library: "shadcn/ui",
          description: "Collapsible sidebar navigation",
          component: "Sidebar",
          imports: [
            'import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"',
          ],
          options: [
            {
              name: "side",
              type: "select",
              options: ["left", "right"],
              defaultValue: "left",
              description: "Sidebar position",
            },
            {
              name: "variant",
              type: "select",
              options: ["sidebar", "floating", "inset"],
              defaultValue: "sidebar",
              description: "Sidebar variant",
            },
          ],
        },
        {
          name: "Menubar",
          library: "shadcn/ui",
          description: "Desktop-style menu bar",
          component: "Menubar",
          imports: [
            'import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"',
          ],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["default", "outline"],
              defaultValue: "default",
              description: "Menubar variant",
            },
          ],
        },
        {
          name: "DropdownMenu",
          library: "shadcn/ui",
          description: "Dropdown menu with items and submenus",
          component: "DropdownMenu",
          imports: [
            'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"',
          ],
          options: [
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Open Menu",
              description: "Trigger button text",
            },
            {
              name: "align",
              type: "select",
              options: ["start", "center", "end"],
              defaultValue: "start",
              description: "Menu alignment",
            },
          ],
        },
        {
          name: "ContextMenu",
          library: "shadcn/ui",
          description: "Right-click context menu",
          component: "ContextMenu",
          imports: [
            'import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"',
          ],
          options: [
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Right click me",
              description: "Trigger element text",
            },
          ],
        },
      ],
    },
    {
      name: "Feedback",
      icon: "💬",
      components: [
        {
          name: "Alert",
          library: "shadcn/ui",
          description: "Display important messages and notifications",
          component: "Alert",
          imports: ['import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["default", "destructive"],
              defaultValue: "default",
              description: "Alert variant",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Alert Title",
              description: "Alert title",
            },
            {
              name: "description",
              type: "text",
              defaultValue: "This is an alert description.",
              description: "Alert description",
            },
          ],
        },
        {
          name: "Toast",
          library: "shadcn/ui",
          description: "Brief notification messages",
          component: "Toast",
          imports: ['import { useToast } from "@/components/ui/use-toast"'],
          options: [
            {
              name: "title",
              type: "text",
              defaultValue: "Notification",
              description: "Toast title",
            },
            {
              name: "description",
              type: "text",
              defaultValue: "This is a toast message",
              description: "Toast description",
            },
            {
              name: "variant",
              type: "select",
              options: ["default", "destructive"],
              defaultValue: "default",
              description: "Toast variant",
            },
          ],
        },
        {
          name: "Progress",
          library: "shadcn/ui",
          description: "Show completion progress of a task",
          component: "Progress",
          imports: ['import { Progress } from "@/components/ui/progress"'],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 50,
              description: "Progress value (0-100)",
            },
          ],
        },
        {
          name: "Skeleton",
          library: "shadcn/ui",
          description: "Loading placeholder with shimmer effect",
          component: "Skeleton",
          imports: ['import { Skeleton } from "@/components/ui/skeleton"'],
          options: [
            {
              name: "width",
              type: "text",
              defaultValue: "100px",
              description: "Skeleton width",
            },
            {
              name: "height",
              type: "text",
              defaultValue: "20px",
              description: "Skeleton height",
            },
          ],
        },
        {
          name: "Sonner",
          library: "shadcn/ui",
          description: "Beautiful toast notifications",
          component: "Toaster",
          imports: ['import { toast } from "sonner"', 'import { Toaster } from "@/components/ui/sonner"'],
          options: [
            {
              name: "position",
              type: "select",
              options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
              defaultValue: "bottom-right",
              description: "Toast position",
            },
          ],
        },
      ],
    },
    {
      name: "Overlay",
      icon: "🪟",
      components: [
        {
          name: "Dialog",
          library: "shadcn/ui",
          description: "Modal dialog overlay",
          component: "Dialog",
          imports: [
            'import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"',
          ],
          options: [
            {
              name: "title",
              type: "text",
              defaultValue: "Dialog Title",
              description: "Dialog title",
            },
            {
              name: "description",
              type: "text",
              defaultValue: "This is a dialog description",
              description: "Dialog description",
            },
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Open Dialog",
              description: "Trigger button text",
            },
          ],
        },
        {
          name: "Popover",
          library: "shadcn/ui",
          description: "Floating content container",
          component: "Popover",
          imports: ['import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"'],
          options: [
            {
              name: "content",
              type: "text",
              defaultValue: "Popover content goes here",
              description: "Popover content",
            },
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Open Popover",
              description: "Trigger text",
            },
            {
              name: "side",
              type: "select",
              options: ["top", "right", "bottom", "left"],
              defaultValue: "bottom",
              description: "Popover position",
            },
          ],
        },
        {
          name: "Sheet",
          library: "shadcn/ui",
          description: "Slide-out panel from screen edge",
          component: "Sheet",
          imports: [
            'import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"',
          ],
          options: [
            {
              name: "side",
              type: "select",
              options: ["top", "right", "bottom", "left"],
              defaultValue: "right",
              description: "Sheet slide direction",
            },
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Open Sheet",
              description: "Trigger button text",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Sheet Title",
              description: "Sheet title",
            },
          ],
        },
        {
          name: "Drawer",
          library: "shadcn/ui",
          description: "Mobile-first drawer component",
          component: "Drawer",
          imports: [
            'import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"',
          ],
          options: [
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Open Drawer",
              description: "Trigger button text",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Drawer Title",
              description: "Drawer title",
            },
          ],
        },
        {
          name: "Tooltip",
          library: "shadcn/ui",
          description: "Contextual information on hover",
          component: "Tooltip",
          imports: [
            'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"',
          ],
          options: [
            {
              name: "content",
              type: "text",
              defaultValue: "This is a tooltip",
              description: "Tooltip content",
            },
            {
              name: "side",
              type: "select",
              options: ["top", "right", "bottom", "left"],
              defaultValue: "top",
              description: "Tooltip position",
            },
            {
              name: "trigger",
              type: "text",
              defaultValue: "Hover me",
              description: "Trigger text",
            },
          ],
        },
        {
          name: "HoverCard",
          library: "shadcn/ui",
          description: "Hover card with rich content",
          component: "HoverCard",
          imports: ['import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hovercard"'],
          options: [
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Hover me",
              description: "Trigger text",
            },
            {
              name: "content",
              type: "text",
              defaultValue: "Rich hover content with details",
              description: "Card content",
            },
          ],
        },
      ],
    },
    {
      name: "Layout",
      icon: "📐",
      components: [
        {
          name: "Separator",
          library: "shadcn/ui",
          description: "Visual divider between content sections",
          component: "Separator",
          imports: ['import { Separator } from "@/components/ui/separator"'],
          options: [
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Separator orientation",
            },
          ],
        },
        {
          name: "ScrollArea",
          library: "shadcn/ui",
          description: "Custom scrollable area with styled scrollbars",
          component: "ScrollArea",
          imports: ['import { ScrollArea } from "@/components/ui/scroll-area"'],
          options: [
            {
              name: "height",
              type: "text",
              defaultValue: "200px",
              description: "Scroll area height",
            },
            {
              name: "width",
              type: "text",
              defaultValue: "300px",
              description: "Scroll area width",
            },
          ],
        },
        {
          name: "Resizable",
          library: "shadcn/ui",
          description: "Resizable panel layout",
          component: "ResizablePanelGroup",
          imports: ['import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"'],
          options: [
            {
              name: "direction",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Resize direction",
            },
          ],
        },
        {
          name: "Carousel",
          library: "shadcn/ui",
          description: "Image and content carousel with navigation",
          component: "Carousel",
          imports: [
            'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"',
          ],
          options: [
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Carousel orientation",
            },
            {
              name: "autoplay",
              type: "boolean",
              defaultValue: false,
              description: "Auto-advance slides",
            },
            {
              name: "loop",
              type: "boolean",
              defaultValue: true,
              description: "Loop slides",
            },
          ],
        },
        {
          name: "Accordion",
          library: "shadcn/ui",
          description: "Collapsible content sections",
          component: "Accordion",
          imports: [
            'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"',
          ],
          options: [
            {
              name: "type",
              type: "select",
              options: ["single", "multiple"],
              defaultValue: "single",
              description: "Accordion type",
            },
            {
              name: "collapsible",
              type: "boolean",
              defaultValue: true,
              description: "Allow collapsing all items",
            },
          ],
        },
        {
          name: "Collapsible",
          library: "shadcn/ui",
          description: "Collapsible content container",
          component: "Collapsible",
          imports: [
            'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"',
          ],
          options: [
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: false,
              description: "Initially open",
            },
            {
              name: "triggerText",
              type: "text",
              defaultValue: "Toggle Content",
              description: "Trigger text",
            },
          ],
        },
      ],
    },
    {
      name: "Utilities",
      icon: "🔧",
      components: [
        {
          name: "Calendar",
          library: "shadcn/ui",
          description: "Interactive calendar for date selection",
          component: "Calendar",
          imports: ['import { Calendar } from "@/components/ui/calendar"'],
          options: [
            {
              name: "mode",
              type: "select",
              options: ["single", "multiple", "range"],
              defaultValue: "single",
              description: "Selection mode",
            },
            {
              name: "showOutsideDays",
              type: "boolean",
              defaultValue: true,
              description: "Show days from other months",
            },
          ],
        },
        {
          name: "Command",
          library: "shadcn/ui",
          description: "Command palette with search and keyboard navigation",
          component: "Command",
          imports: [
            'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"',
          ],
          options: [
            {
              name: "placeholder",
              type: "text",
              defaultValue: "Type a command or search...",
              description: "Search placeholder",
            },
            {
              name: "empty",
              type: "text",
              defaultValue: "No results found.",
              description: "Empty state message",
            },
          ],
        },
      ],
    },
  ],
  HTML5: [
    {
      name: "Form Elements",
      icon: "📋",
      components: [
        {
          name: "Button",
          library: "HTML5",
          description: "Native HTML button element",
          component: "button",
          imports: [],
          options: [
            {
              name: "type",
              type: "select",
              options: ["button", "submit", "reset"],
              defaultValue: "button",
              description: "Button type",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "Click me",
              description: "Button text",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable button",
            },
          ],
        },
        {
          name: "Input",
          library: "HTML5",
          description: "Native HTML input element",
          component: "input",
          imports: [],
          options: [
            {
              name: "type",
              type: "select",
              options: [
                "text",
                "email",
                "password",
                "number",
                "tel",
                "url",
                "search",
                "date",
                "time",
                "color",
                "file",
                "range",
                "checkbox",
                "radio",
              ],
              defaultValue: "text",
              description: "Input type",
            },
            {
              name: "placeholder",
              type: "text",
              defaultValue: "Enter text...",
              description: "Placeholder text",
            },
            {
              name: "required",
              type: "boolean",
              defaultValue: false,
              description: "Required field",
            },
          ],
        },
        {
          name: "Select",
          library: "HTML5",
          description: "Native HTML select dropdown",
          component: "select",
          imports: [],
          options: [
            {
              name: "multiple",
              type: "boolean",
              defaultValue: false,
              description: "Allow multiple selections",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable select",
            },
          ],
        },
        {
          name: "Textarea",
          library: "HTML5",
          description: "Native HTML textarea element",
          component: "textarea",
          imports: [],
          options: [
            {
              name: "placeholder",
              type: "text",
              defaultValue: "Enter your message...",
              description: "Placeholder text",
            },
            {
              name: "rows",
              type: "number",
              defaultValue: 4,
              description: "Number of rows",
            },
          ],
        },
        {
          name: "Fieldset",
          library: "HTML5",
          description: "Group related form controls",
          component: "fieldset",
          imports: [],
          options: [
            {
              name: "legend",
              type: "text",
              defaultValue: "Form Section",
              description: "Fieldset legend",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: false,
              description: "Disable all controls",
            },
          ],
        },
        {
          name: "Progress",
          library: "HTML5",
          description: "Native HTML progress bar",
          component: "progress",
          imports: [],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 50,
              description: "Current progress value",
            },
            {
              name: "max",
              type: "number",
              defaultValue: 100,
              description: "Maximum value",
            },
          ],
        },
        {
          name: "Meter",
          library: "HTML5",
          description: "Native HTML meter for scalar measurements",
          component: "meter",
          imports: [],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 6,
              description: "Current value",
            },
            {
              name: "min",
              type: "number",
              defaultValue: 0,
              description: "Minimum value",
            },
            {
              name: "max",
              type: "number",
              defaultValue: 10,
              description: "Maximum value",
            },
          ],
        },
        {
          name: "Datalist",
          library: "HTML5",
          description: "Predefined options for input elements",
          component: "datalist",
          imports: [],
          options: [
            {
              name: "id",
              type: "text",
              defaultValue: "suggestions",
              description: "Datalist ID",
            },
          ],
        },
        {
          name: "Output",
          library: "HTML5",
          description: "Result of a calculation or user action",
          component: "output",
          imports: [],
          options: [
            {
              name: "for",
              type: "text",
              defaultValue: "input1 input2",
              description: "Associated form controls",
            },
            {
              name: "value",
              type: "text",
              defaultValue: "42",
              description: "Output value",
            },
          ],
        },
      ],
    },
    {
      name: "Media",
      icon: "🎬",
      components: [
        {
          name: "Image",
          library: "HTML5",
          description: "Display images with various attributes",
          component: "img",
          imports: [],
          options: [
            {
              name: "src",
              type: "text",
              defaultValue: "/placeholder.svg?height=200&width=300",
              description: "Image source URL",
            },
            {
              name: "alt",
              type: "text",
              defaultValue: "Placeholder image",
              description: "Alternative text",
            },
            {
              name: "width",
              type: "number",
              defaultValue: 300,
              description: "Image width",
            },
            {
              name: "height",
              type: "number",
              defaultValue: 200,
              description: "Image height",
            },
          ],
        },
        {
          name: "Video",
          library: "HTML5",
          description: "Embed video content",
          component: "video",
          imports: [],
          options: [
            {
              name: "controls",
              type: "boolean",
              defaultValue: true,
              description: "Show video controls",
            },
            {
              name: "autoplay",
              type: "boolean",
              defaultValue: false,
              description: "Auto-play video",
            },
            {
              name: "loop",
              type: "boolean",
              defaultValue: false,
              description: "Loop video",
            },
            {
              name: "width",
              type: "number",
              defaultValue: 320,
              description: "Video width",
            },
            {
              name: "height",
              type: "number",
              defaultValue: 240,
              description: "Video height",
            },
          ],
        },
        {
          name: "Audio",
          library: "HTML5",
          description: "Embed audio content",
          component: "audio",
          imports: [],
          options: [
            {
              name: "controls",
              type: "boolean",
              defaultValue: true,
              description: "Show audio controls",
            },
            {
              name: "autoplay",
              type: "boolean",
              defaultValue: false,
              description: "Auto-play audio",
            },
            {
              name: "loop",
              type: "boolean",
              defaultValue: false,
              description: "Loop audio",
            },
          ],
        },
        {
          name: "Canvas",
          library: "HTML5",
          description: "HTML5 canvas for graphics and animations",
          component: "canvas",
          imports: [],
          options: [
            {
              name: "width",
              type: "number",
              defaultValue: 400,
              description: "Canvas width",
            },
            {
              name: "height",
              type: "number",
              defaultValue: 300,
              description: "Canvas height",
            },
          ],
        },
        {
          name: "SVG",
          library: "HTML5",
          description: "Scalable Vector Graphics container",
          component: "svg",
          imports: [],
          options: [
            {
              name: "width",
              type: "number",
              defaultValue: 200,
              description: "SVG width",
            },
            {
              name: "height",
              type: "number",
              defaultValue: 200,
              description: "SVG height",
            },
            {
              name: "viewBox",
              type: "text",
              defaultValue: "0 0 200 200",
              description: "SVG viewBox",
            },
          ],
        },
        {
          name: "Picture",
          library: "HTML5",
          description: "Responsive images with multiple sources",
          component: "picture",
          imports: [],
          options: [
            {
              name: "alt",
              type: "text",
              defaultValue: "Responsive image",
              description: "Alternative text",
            },
          ],
        },
        {
          name: "Figure",
          library: "HTML5",
          description: "Self-contained content with caption",
          component: "figure",
          imports: [],
          options: [
            {
              name: "caption",
              type: "text",
              defaultValue: "Figure caption",
              description: "Figure caption text",
            },
          ],
        },
      ],
    },
    {
      name: "Structure",
      icon: "🏗️",
      components: [
        {
          name: "Table",
          library: "HTML5",
          description: "Native HTML table for tabular data",
          component: "table",
          imports: [],
          options: [
            {
              name: "caption",
              type: "text",
              defaultValue: "Sample Table",
              description: "Table caption",
            },
            {
              name: "border",
              type: "boolean",
              defaultValue: true,
              description: "Show table borders",
            },
          ],
        },
        {
          name: "List (Ordered)",
          library: "HTML5",
          description: "Ordered list with numbered items",
          component: "ol",
          imports: [],
          options: [
            {
              name: "type",
              type: "select",
              options: ["1", "A", "a", "I", "i"],
              defaultValue: "1",
              description: "List marker type",
            },
            {
              name: "start",
              type: "number",
              defaultValue: 1,
              description: "Starting number",
            },
          ],
        },
        {
          name: "List (Unordered)",
          library: "HTML5",
          description: "Unordered list with bullet points",
          component: "ul",
          imports: [],
          options: [
            {
              name: "style",
              type: "select",
              options: ["disc", "circle", "square", "none"],
              defaultValue: "disc",
              description: "List marker style",
            },
          ],
        },
        {
          name: "Details",
          library: "HTML5",
          description: "Collapsible content disclosure widget",
          component: "details",
          imports: [],
          options: [
            {
              name: "open",
              type: "boolean",
              defaultValue: false,
              description: "Initially open",
            },
            {
              name: "summary",
              type: "text",
              defaultValue: "Click to expand",
              description: "Summary text",
            },
          ],
        },
        {
          name: "Dialog",
          library: "HTML5",
          description: "Native HTML dialog modal",
          component: "dialog",
          imports: [],
          options: [
            {
              name: "open",
              type: "boolean",
              defaultValue: false,
              description: "Dialog open state",
            },
            {
              name: "content",
              type: "text",
              defaultValue: "This is a native dialog",
              description: "Dialog content",
            },
          ],
        },
      ],
    },
    {
      name: "Semantic",
      icon: "🏷️",
      components: [
        {
          name: "Mark",
          library: "HTML5",
          description: "Highlighted or marked text",
          component: "mark",
          imports: [],
          options: [
            {
              name: "children",
              type: "text",
              defaultValue: "highlighted text",
              description: "Text to highlight",
            },
          ],
        },
        {
          name: "Time",
          library: "HTML5",
          description: "Date and time representation",
          component: "time",
          imports: [],
          options: [
            {
              name: "datetime",
              type: "text",
              defaultValue: "2024-01-15T10:30:00",
              description: "Machine-readable datetime",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "January 15, 2024 at 10:30 AM",
              description: "Human-readable time",
            },
          ],
        },
        {
          name: "Data",
          library: "HTML5",
          description: "Machine-readable data",
          component: "data",
          imports: [],
          options: [
            {
              name: "value",
              type: "text",
              defaultValue: "12345",
              description: "Machine-readable value",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "Product #12345",
              description: "Human-readable content",
            },
          ],
        },
      ],
    },
    {
      name: "Advanced",
      icon: "🚀",
      components: [
        {
          name: "Iframe",
          library: "HTML5",
          description: "Embedded frame for external content",
          component: "iframe",
          imports: [],
          options: [
            {
              name: "src",
              type: "text",
              defaultValue: "https://example.com",
              description: "Frame source URL",
            },
            {
              name: "width",
              type: "number",
              defaultValue: 400,
              description: "Frame width",
            },
            {
              name: "height",
              type: "number",
              defaultValue: 300,
              description: "Frame height",
            },
          ],
        },
        {
          name: "Web Components",
          library: "HTML5",
          description: "Custom web components with Shadow DOM",
          component: "custom-element",
          imports: [],
          options: [
            {
              name: "shadowMode",
              type: "select",
              options: ["open", "closed"],
              defaultValue: "open",
              description: "Shadow DOM mode",
            },
          ],
        },
        {
          name: "Drag and Drop",
          library: "HTML5",
          description: "Native HTML5 drag and drop",
          component: "draggable-item",
          imports: [],
          options: [
            {
              name: "draggable",
              type: "boolean",
              defaultValue: true,
              description: "Enable dragging",
            },
          ],
        },
      ],
    },
  ],
  "Material-UI": [
    {
      name: "Inputs",
      icon: "⌨️",
      components: [
        {
          name: "TextField",
          library: "Material-UI",
          description: "Material Design text field",
          component: "TextField",
          imports: ['import { TextField } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["outlined", "filled", "standard"],
              defaultValue: "outlined",
              description: "TextField variant",
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Label",
              description: "Field label",
            },
            {
              name: "size",
              type: "select",
              options: ["small", "medium"],
              defaultValue: "medium",
              description: "Field size",
            },
          ],
        },
        {
          name: "Button",
          library: "Material-UI",
          description: "Material Design button component",
          component: "Button",
          imports: ['import { Button } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["text", "outlined", "contained"],
              defaultValue: "contained",
              description: "Button variant",
            },
            {
              name: "color",
              type: "select",
              options: ["primary", "secondary", "success", "error", "info", "warning"],
              defaultValue: "primary",
              description: "Button color",
            },
            {
              name: "size",
              type: "select",
              options: ["small", "medium", "large"],
              defaultValue: "medium",
              description: "Button size",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "Button",
              description: "Button text",
            },
          ],
        },
        {
          name: "Checkbox",
          library: "Material-UI",
          description: "Material Design checkbox",
          component: "Checkbox",
          imports: ['import { Checkbox, FormControlLabel } from "@mui/material"'],
          options: [
            {
              name: "checked",
              type: "boolean",
              defaultValue: false,
              description: "Checked state",
            },
            {
              name: "color",
              type: "select",
              options: ["primary", "secondary", "success", "error"],
              defaultValue: "primary",
              description: "Checkbox color",
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Checkbox Label",
              description: "Checkbox label",
            },
          ],
        },
        {
          name: "Switch",
          library: "Material-UI",
          description: "Material Design switch toggle",
          component: "Switch",
          imports: ['import { Switch, FormControlLabel } from "@mui/material"'],
          options: [
            {
              name: "checked",
              type: "boolean",
              defaultValue: false,
              description: "Switch state",
            },
            {
              name: "color",
              type: "select",
              options: ["primary", "secondary", "success", "error"],
              defaultValue: "primary",
              description: "Switch color",
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Switch Label",
              description: "Switch label",
            },
          ],
        },
        {
          name: "Slider",
          library: "Material-UI",
          description: "Material Design slider",
          component: "Slider",
          imports: ['import { Slider } from "@mui/material"'],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 30,
              description: "Slider value",
            },
            {
              name: "min",
              type: "number",
              defaultValue: 0,
              description: "Minimum value",
            },
            {
              name: "max",
              type: "number",
              defaultValue: 100,
              description: "Maximum value",
            },
          ],
        },
        {
          name: "Autocomplete",
          library: "Material-UI",
          description: "Autocomplete input with suggestions",
          component: "Autocomplete",
          imports: ['import { Autocomplete, TextField } from "@mui/material"'],
          options: [
            {
              name: "multiple",
              type: "boolean",
              defaultValue: false,
              description: "Multiple selection",
            },
            {
              name: "freeSolo",
              type: "boolean",
              defaultValue: false,
              description: "Allow free text input",
            },
          ],
        },
        {
          name: "Select",
          library: "Material-UI",
          description: "Select dropdown component",
          component: "Select",
          imports: ['import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["outlined", "filled", "standard"],
              defaultValue: "outlined",
              description: "Select variant",
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Select Option",
              description: "Select label",
            },
          ],
        },
        {
          name: "Rating",
          library: "Material-UI",
          description: "Star rating component",
          component: "Rating",
          imports: ['import { Rating } from "@mui/material"'],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 3,
              description: "Rating value",
            },
            {
              name: "max",
              type: "number",
              defaultValue: 5,
              description: "Maximum rating",
            },
            {
              name: "size",
              type: "select",
              options: ["small", "medium", "large"],
              defaultValue: "medium",
              description: "Rating size",
            },
          ],
        },
      ],
    },
    {
      name: "Data Display",
      icon: "📈",
      components: [
        {
          name: "Card",
          library: "Material-UI",
          description: "Material Design card container",
          component: "Card",
          imports: ['import { Card, CardContent, CardActions, CardHeader } from "@mui/material"'],
          options: [
            {
              name: "elevation",
              type: "number",
              defaultValue: 1,
              description: "Card elevation (0-24)",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Card Title",
              description: "Card title",
            },
            {
              name: "content",
              type: "text",
              defaultValue: "Card content goes here",
              description: "Card content",
            },
          ],
        },
        {
          name: "Chip",
          library: "Material-UI",
          description: "Material Design chip component",
          component: "Chip",
          imports: ['import { Chip } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["filled", "outlined"],
              defaultValue: "filled",
              description: "Chip variant",
            },
            {
              name: "color",
              type: "select",
              options: ["default", "primary", "secondary", "success", "error"],
              defaultValue: "default",
              description: "Chip color",
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Chip",
              description: "Chip label",
            },
          ],
        },
        {
          name: "Avatar",
          library: "Material-UI",
          description: "Display user avatars",
          component: "Avatar",
          imports: ['import { Avatar } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["circular", "rounded", "square"],
              defaultValue: "circular",
              description: "Avatar shape",
            },
            {
              name: "src",
              type: "text",
              defaultValue: "",
              description: "Avatar image URL",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "JD",
              description: "Fallback text/initials",
            },
          ],
        },
        {
          name: "Badge",
          library: "Material-UI",
          description: "Small status descriptors",
          component: "Badge",
          imports: ['import { Badge } from "@mui/material"'],
          options: [
            {
              name: "badgeContent",
              type: "text",
              defaultValue: "4",
              description: "Badge content",
            },
            {
              name: "color",
              type: "select",
              options: ["default", "primary", "secondary", "error"],
              defaultValue: "primary",
              description: "Badge color",
            },
          ],
        },
        {
          name: "DataGrid",
          library: "Material-UI",
          description: "Advanced data grid with sorting, filtering",
          component: "DataGrid",
          imports: ['import { DataGrid } from "@mui/x-data-grid"'],
          options: [
            {
              name: "checkboxSelection",
              type: "boolean",
              defaultValue: false,
              description: "Show checkboxes",
            },
            {
              name: "pageSize",
              type: "number",
              defaultValue: 5,
              description: "Rows per page",
            },
          ],
        },
        {
          name: "Timeline",
          library: "Material-UI",
          description: "Timeline component for events",
          component: "Timeline",
          imports: [
            'import { Timeline, TimelineItem, TimelineSeparator, TimelineContent, TimelineDot } from "@mui/lab"',
          ],
          options: [
            {
              name: "align",
              type: "select",
              options: ["left", "right", "alternate"],
              defaultValue: "right",
              description: "Timeline alignment",
            },
          ],
        },
      ],
    },
    {
      name: "Feedback",
      icon: "💬",
      components: [
        {
          name: "Alert",
          library: "Material-UI",
          description: "Material Design alert messages",
          component: "Alert",
          imports: ['import { Alert } from "@mui/material"'],
          options: [
            {
              name: "severity",
              type: "select",
              options: ["error", "warning", "info", "success"],
              defaultValue: "info",
              description: "Alert severity",
            },
            {
              name: "variant",
              type: "select",
              options: ["filled", "outlined", "standard"],
              defaultValue: "standard",
              description: "Alert variant",
            },
            {
              name: "children",
              type: "text",
              defaultValue: "This is an alert message",
              description: "Alert content",
            },
          ],
        },
        {
          name: "Snackbar",
          library: "Material-UI",
          description: "Brief messages at bottom of screen",
          component: "Snackbar",
          imports: ['import { Snackbar } from "@mui/material"'],
          options: [
            {
              name: "open",
              type: "boolean",
              defaultValue: true,
              description: "Snackbar visibility",
            },
            {
              name: "message",
              type: "text",
              defaultValue: "This is a snackbar message",
              description: "Snackbar message",
            },
          ],
        },
        {
          name: "LinearProgress",
          library: "Material-UI",
          description: "Linear progress indicator",
          component: "LinearProgress",
          imports: ['import { LinearProgress } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["determinate", "indeterminate"],
              defaultValue: "determinate",
              description: "Progress variant",
            },
            {
              name: "value",
              type: "number",
              defaultValue: 50,
              description: "Progress value (0-100)",
            },
          ],
        },
        {
          name: "CircularProgress",
          library: "Material-UI",
          description: "Circular progress indicator",
          component: "CircularProgress",
          imports: ['import { CircularProgress } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["determinate", "indeterminate"],
              defaultValue: "indeterminate",
              description: "Progress variant",
            },
            {
              name: "size",
              type: "number",
              defaultValue: 40,
              description: "Progress size",
            },
          ],
        },
        {
          name: "Skeleton",
          library: "Material-UI",
          description: "Loading placeholder skeleton",
          component: "Skeleton",
          imports: ['import { Skeleton } from "@mui/material"'],
          options: [
            {
              name: "variant",
              type: "select",
              options: ["text", "rectangular", "circular"],
              defaultValue: "text",
              description: "Skeleton variant",
            },
            {
              name: "width",
              type: "number",
              defaultValue: 200,
              description: "Skeleton width",
            },
            {
              name: "height",
              type: "number",
              defaultValue: 40,
              description: "Skeleton height",
            },
          ],
        },
      ],
    },
    {
      name: "Navigation",
      icon: "🗺️",
      components: [
        {
          name: "Tabs",
          library: "Material-UI",
          description: "Material Design tabs",
          component: "Tabs",
          imports: ['import { Tabs, Tab, Box } from "@mui/material"'],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 0,
              description: "Active tab index",
            },
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Tabs orientation",
            },
          ],
        },
        {
          name: "Drawer",
          library: "Material-UI",
          description: "Navigation drawer panel",
          component: "Drawer",
          imports: ['import { Drawer, List, ListItem, ListItemText } from "@mui/material"'],
          options: [
            {
              name: "anchor",
              type: "select",
              options: ["left", "right", "top", "bottom"],
              defaultValue: "left",
              description: "Drawer position",
            },
            {
              name: "variant",
              type: "select",
              options: ["temporary", "persistent", "permanent"],
              defaultValue: "temporary",
              description: "Drawer variant",
            },
          ],
        },
        {
          name: "BottomNavigation",
          library: "Material-UI",
          description: "Bottom navigation bar",
          component: "BottomNavigation",
          imports: ['import { BottomNavigation, BottomNavigationAction } from "@mui/material"'],
          options: [
            {
              name: "value",
              type: "number",
              defaultValue: 0,
              description: "Selected tab index",
            },
            {
              name: "showLabels",
              type: "boolean",
              defaultValue: true,
              description: "Show tab labels",
            },
          ],
        },
        {
          name: "Breadcrumbs",
          library: "Material-UI",
          description: "Navigation breadcrumb trail",
          component: "Breadcrumbs",
          imports: ['import { Breadcrumbs, Link, Typography } from "@mui/material"'],
          options: [
            {
              name: "separator",
              type: "text",
              defaultValue: "/",
              description: "Breadcrumb separator",
            },
            {
              name: "maxItems",
              type: "number",
              defaultValue: 8,
              description: "Maximum visible items",
            },
          ],
        },
        {
          name: "Stepper",
          library: "Material-UI",
          description: "Step-by-step navigation",
          component: "Stepper",
          imports: ['import { Stepper, Step, StepLabel } from "@mui/material"'],
          options: [
            {
              name: "activeStep",
              type: "number",
              defaultValue: 1,
              description: "Current active step",
            },
            {
              name: "orientation",
              type: "select",
              options: ["horizontal", "vertical"],
              defaultValue: "horizontal",
              description: "Stepper orientation",
            },
          ],
        },
      ],
    },
    {
      name: "Surfaces",
      icon: "🎨",
      components: [
        {
          name: "Dialog",
          library: "Material-UI",
          description: "Material Design dialog modal",
          component: "Dialog",
          imports: ['import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"'],
          options: [
            {
              name: "open",
              type: "boolean",
              defaultValue: false,
              description: "Dialog open state",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Dialog Title",
              description: "Dialog title",
            },
            {
              name: "maxWidth",
              type: "select",
              options: ["xs", "sm", "md", "lg", "xl"],
              defaultValue: "sm",
              description: "Maximum width",
            },
          ],
        },
        {
          name: "Accordion",
          library: "Material-UI",
          description: "Material Design expansion panels",
          component: "Accordion",
          imports: ['import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"'],
          options: [
            {
              name: "expanded",
              type: "boolean",
              defaultValue: false,
              description: "Initially expanded",
            },
            {
              name: "summary",
              type: "text",
              defaultValue: "Accordion Summary",
              description: "Summary text",
            },
          ],
        },
        {
          name: "Tooltip",
          library: "Material-UI",
          description: "Material Design tooltip",
          component: "Tooltip",
          imports: ['import { Tooltip, Button } from "@mui/material"'],
          options: [
            {
              name: "title",
              type: "text",
              defaultValue: "Tooltip content",
              description: "Tooltip text",
            },
            {
              name: "placement",
              type: "select",
              options: ["top", "right", "bottom", "left"],
              defaultValue: "top",
              description: "Tooltip placement",
            },
            {
              name: "arrow",
              type: "boolean",
              defaultValue: false,
              description: "Show arrow",
            },
          ],
        },
      ],
    },
  ],
}
