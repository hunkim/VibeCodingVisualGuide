"use client"

import type { ComponentInfo } from "./component-registry"

export function generateCode(component: ComponentInfo, options: Record<string, any>): string {
  const imports = component.imports.join("\n")

  let code = ""

  // Add imports
  if (imports) {
    code += imports + "\n\n"
  }

  // Generate component JSX
  if (component.library === "HTML5") {
    code += generateHTMLCode(component, options)
  } else if (component.library === "shadcn/ui") {
    code += generateShadcnCode(component, options)
  } else if (component.library === "Material-UI") {
    code += generateMUICode(component, options)
  }

  return code
}

export function generateVibePrompt(component: ComponentInfo, options: Record<string, any>): string {
  const componentName = component.name
  const library = component.library
  
  switch (componentName) {
    case "Dialog":
      return `Create a modal dialog with the following specifications:

📋 **Component**: ${componentName} from ${library}
🎯 **Purpose**: ${component.description}

**Requirements:**
• Dialog title: "${options.title || "Dialog Title"}"
• Dialog description: "${options.description || "This is a dialog description"}"
• Trigger button text: "${options.triggerText || "Open Dialog"}"
• The dialog should be modal (overlay background)
• Include a trigger button that opens the dialog
• The dialog content should be centered and responsive
• Maximum width should be around 425px on small screens
• Include proper accessibility attributes
• The dialog should close when clicking outside or pressing escape

**Visual Style:**
• Use clean, modern design
• Proper spacing and typography hierarchy
• Subtle shadows and borders
• Responsive layout that works on all devices

**Behavior:**
• Smooth open/close animations
• Focus management for accessibility
• Keyboard navigation support
• Click outside to close functionality`

    default:
      return `Create a ${componentName} component with the following specifications:

📋 **Component**: ${componentName} from ${library}
🎯 **Purpose**: ${component.description}

**Current Configuration:**
${Object.entries(options).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

**Requirements:**
• Implement using ${library} design system
• Follow modern UI/UX patterns
• Ensure responsive design
• Include proper accessibility attributes
• Use clean, professional styling

**Visual Style:**
• Modern and clean design
• Consistent with design system
• Proper spacing and typography
• Subtle visual feedback for interactions`
  }
}

function generateShadcnCode(component: ComponentInfo, options: Record<string, any>): string {
  const componentName = component.component
  const props: string[] = []

  Object.entries(options).forEach(([key, value]) => {
    if (key === "children" || key === "content" || key === "title" || key === "description") return

    if (typeof value === "boolean") {
      if (value) props.push(key)
    } else if (value !== undefined && value !== "" && value !== "default") {
      props.push(`${key}="${value}"`)
    }
  })

  const propsString = props.length > 0 ? " " + props.join(" ") : ""

  switch (componentName) {
    case "Card":
      return `<Card>
  <CardHeader>
    <CardTitle>${options.title || "Card Title"}</CardTitle>
    <CardDescription>${options.description || "Card description"}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>${options.content || "Card content goes here."}</p>
  </CardContent>${
    options.showFooter
      ? `
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>`
      : ""
  }
</Card>`
    case "Alert":
      return `<Alert${propsString}>
  <AlertTitle>${options.title || "Alert Title"}</AlertTitle>
  <AlertDescription>
    ${options.description || "This is an alert description."}
  </AlertDescription>
</Alert>`
    case "Avatar":
      return `<Avatar${propsString}>
  <AvatarImage src="${options.src || ""}" />
  <AvatarFallback>${options.fallback || "JD"}</AvatarFallback>
</Avatar>`
    case "Checkbox":
      return `<div className="flex items-center space-x-2">
  <Checkbox${propsString} id="checkbox" />
  <label htmlFor="checkbox" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    ${options.label || "Accept terms and conditions"}
  </label>
</div>`
    case "Switch":
      return `<div className="flex items-center space-x-2">
  <Switch${propsString} id="switch" />
  <label htmlFor="switch" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Switch
  </label>
</div>`
    case "Progress":
      return `<Progress${propsString} />`
    case "Slider":
      return `<Slider${propsString} />`
    case "Textarea":
      return `<Textarea${propsString} />`
    case "Select":
      return `<Select${propsString}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="${options.placeholder || "Select an option"}" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`
    case "Separator":
      return `<Separator${propsString} />`
    case "Skeleton":
      return `<Skeleton className="w-[${options.width}] h-[${options.height}]${options.shape === "circle" ? " rounded-full" : ""}" />`
    case "ScrollArea":
      return `<ScrollArea className="h-[${options.height}] w-[${options.width}] rounded-md border">
  <div className="p-4">
    <p>${options.content || "Scrollable content goes here..."}</p>
  </div>
</ScrollArea>`
    case "Tabs":
      return `<Tabs defaultValue="${options.defaultValue || "tab1"}" className="w-[400px]"${options.orientation === "vertical" ? ' orientation="vertical"' : ""}>
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Content for Tab 1</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Content for Tab 2</p>
  </TabsContent>
  <TabsContent value="tab3">
    <p>Content for Tab 3</p>
  </TabsContent>
</Tabs>`
    case "Accordion":
      return `<Accordion type="${options.type || "single"}"${options.collapsible ? " collapsible" : ""} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Accordion Item 1</AccordionTrigger>
    <AccordionContent>
      Content for accordion item 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Accordion Item 2</AccordionTrigger>
    <AccordionContent>
      Content for accordion item 2
    </AccordionContent>
  </AccordionItem>
</Accordion>`
    case "Dialog":
      return `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">${options.triggerText || "Open Dialog"}</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>${options.title || "Dialog Title"}</DialogTitle>
      <DialogDescription>
        ${options.description || "This is a dialog description"}
      </DialogHeader>
    </DialogContent>
</Dialog>`
    case "Popover":
      return `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">${options.triggerText || "Open Popover"}</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80"${options.side !== "bottom" ? ` side="${options.side}"` : ""}>
    <p>${options.content || "Popover content goes here"}</p>
  </PopoverContent>
</Popover>`
    case "Tooltip":
      return `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">${options.trigger || "Hover me"}</Button>
    </TooltipTrigger>
    <TooltipContent${options.side !== "top" ? ` side="${options.side}"` : ""}>
      <p>${options.content || "This is a tooltip"}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`
    case "Input":
      return `<Input${propsString} />`
    default:
      return `<${componentName}${propsString}>${options.children || "Content"}</${componentName}>`
  }
}

function generateHTMLCode(component: ComponentInfo, options: Record<string, any>): string {
  const tag = component.component
  const props: string[] = []

  Object.entries(options).forEach(([key, value]) => {
    if (key === "children" || key === "content" || key === "summary" || key === "legend" || key === "caption") return

    if (typeof value === "boolean") {
      if (value) props.push(key)
    } else if (value !== undefined && value !== "") {
      props.push(`${key}="${value}"`)
    }
  })

  const propsString = props.length > 0 ? " " + props.join(" ") : ""

  switch (tag) {
    case "input":
      return `<input${propsString} />`
    case "select":
      return `<select${propsString}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>`
    case "textarea":
      return `<textarea${propsString}>${options.children || ""}</textarea>`
    case "progress":
      return `<progress${propsString}>${options.value}%</progress>`
    case "meter":
      return `<meter${propsString}>${options.value}</meter>`
    case "details":
      return `<details${propsString}>
  <summary>${options.summary || "Click to expand"}</summary>
  <p>${options.content || "Hidden content goes here..."}</p>
</details>`
    case "dialog":
      return `<dialog${propsString}>
  <p>${options.content || "This is a native dialog"}</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>`
    case "fieldset":
      return `<fieldset${propsString}>
  <legend>${options.legend || "Form Section"}</legend>
  <label>
    Field 1: <input type="text" name="field1" />
  </label>
  <label>
    Field 2: <input type="text" name="field2" />
  </label>
</fieldset>`
    case "table":
      return `<table${propsString}>
  ${options.caption ? `<caption>${options.caption}</caption>` : ""}
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Col 1</td>
      <td>Row 1, Col 2</td>
      <td>Row 1, Col 3</td>
    </tr>
    <tr>
      <td>Row 2, Col 1</td>
      <td>Row 2, Col 2</td>
      <td>Row 2, Col 3</td>
    </tr>
  </tbody>
</table>`
    case "ol":
      return `<ol${propsString}>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>`
    case "ul":
      return `<ul${propsString}>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`
    case "img":
      return `<img${propsString} />`
    case "video":
      return `<video${propsString}>
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`
    case "audio":
      return `<audio${propsString}>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`
    default:
      return `<${tag}${propsString}>${options.children || "Content"}</${tag}>`
  }
}

function generateMUICode(component: ComponentInfo, options: Record<string, any>): string {
  const componentName = component.component
  const props: string[] = []

  Object.entries(options).forEach(([key, value]) => {
    if (
      key === "children" ||
      key === "label" ||
      key === "badgeContent" ||
      key === "title" ||
      key === "content" ||
      key === "message" ||
      key === "triggerText" ||
      key === "summary" ||
      key === "details"
    )
      return

    if (typeof value === "boolean") {
      if (value) props.push(key)
    } else if (value !== undefined && value !== "") {
      props.push(`${key}="${value}"`)
    }
  })

  const propsString = props.length > 0 ? " " + props.join(" ") : ""

  switch (componentName) {
    case "TextField":
      const labelProp = options.label ? ` label="${options.label}"` : ""
      return `<TextField${propsString}${labelProp} />`
    case "Chip":
      return `<Chip${propsString} label="${options.label || "Chip"}" />`
    case "Card":
      return `<Card${propsString}>
  <CardHeader>
    <Typography variant="h5" component="div">
      ${options.title || "Card Title"}
    </Typography>
  </CardHeader>
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      ${options.content || "Card content goes here"}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Action</Button>
  </CardActions>
</Card>`
    case "Avatar":
      return `<Avatar${propsString}${options.src ? ` src="${options.src}"` : ""}${options.alt ? ` alt="${options.alt}"` : ""}>
  ${!options.src ? options.children || "JD" : ""}
</Avatar>`
    case "Badge":
      return `<Badge${propsString} badgeContent="${options.badgeContent || "4"}">
  <Avatar>
    <PersonIcon />
  </Avatar>
</Badge>`
    case "Checkbox":
      return `<FormControlLabel
  control={<Checkbox${propsString} />}
  label="${options.label || "Checkbox Label"}"
/>`
    case "Switch":
      return `<FormControlLabel
  control={<Switch${propsString} />}
  label="${options.label || "Switch Label"}"
/>`
    case "Radio":
      return `<RadioGroup${propsString} value="${options.value || "option1"}">
  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
  <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
</RadioGroup>`
    case "Slider":
      return `<Slider${propsString} />`
    case "LinearProgress":
      return `<LinearProgress${propsString} />`
    case "CircularProgress":
      return `<CircularProgress${propsString} />`
    case "Alert":
      return `<Alert${propsString}${options.onClose ? " onClose={() => {}}" : ""}>
  ${options.children || "This is an alert message"}
</Alert>`
    case "Snackbar":
      return `<Snackbar${propsString} message="${options.message || "This is a snackbar message"}" />`
    case "Tooltip":
      return `<Tooltip${propsString} title="${options.title || "Tooltip content"}">
  <Button>${options.triggerText || "Hover me"}</Button>
</Tooltip>`
    case "Tabs":
      return `<Box sx={{ width: '100%' }}>
  <Tabs${propsString}>
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
    <Tab label="Tab 3" />
  </Tabs>
  <TabPanel value={0}>Tab 1 content</TabPanel>
  <TabPanel value={1}>Tab 2 content</TabPanel>
  <TabPanel value={2}>Tab 3 content</TabPanel>
</Box>`
    case "Accordion":
      return `<Accordion${propsString}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography>${options.summary || "Accordion Summary"}</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      ${options.details || "Accordion details content goes here"}
    </Typography>
  </AccordionDetails>
</Accordion>`
    case "Dialog":
      return `<Dialog${propsString}>
  <DialogTitle>${options.title || "Dialog Title"}</DialogTitle>
  <DialogContent>
    <DialogContentText>
      ${options.content || "Dialog content goes here"}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleClose} autoFocus>
      OK
    </Button>
  </DialogActions>
</Dialog>`
    default:
      return `<${componentName}${propsString}>${options.children || "Content"}</${componentName}>`
  }
}
