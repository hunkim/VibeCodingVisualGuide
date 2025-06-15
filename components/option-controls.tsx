"use client"

import type { ComponentOption } from "@/lib/component-registry"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OptionControlsProps {
  options: ComponentOption[]
  values: Record<string, any>
  onChange: (optionName: string, value: any) => void
}

export function OptionControls({ options, values, onChange }: OptionControlsProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name} className="space-y-2">
          <Label htmlFor={option.name} className="text-sm font-medium text-gray-300">
            {option.name}
            {option.description && <span className="text-xs text-gray-500 ml-2">({option.description})</span>}
          </Label>

          {option.type === "select" && (
            <Select
              value={values[option.name]?.toString() || option.defaultValue?.toString()}
              onValueChange={(value) => onChange(option.name, value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {option.options?.map((optionValue) => (
                  <SelectItem key={optionValue} value={optionValue} className="text-gray-100 focus:bg-gray-700">
                    {optionValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {option.type === "boolean" && (
            <div className="flex items-center space-x-2">
              <Switch
                id={option.name}
                checked={values[option.name] || false}
                onCheckedChange={(checked) => onChange(option.name, checked)}
              />
              <Label htmlFor={option.name} className="text-sm text-gray-400">
                {values[option.name] ? "Enabled" : "Disabled"}
              </Label>
            </div>
          )}

          {option.type === "text" && (
            <Input
              id={option.name}
              type="text"
              value={values[option.name] || ""}
              onChange={(e) => onChange(option.name, e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-100"
            />
          )}

          {option.type === "number" && (
            <Input
              id={option.name}
              type="number"
              value={values[option.name] || ""}
              onChange={(e) => onChange(option.name, Number.parseInt(e.target.value) || 0)}
              className="bg-gray-800 border-gray-700 text-gray-100"
            />
          )}
        </div>
      ))}
    </div>
  )
}
