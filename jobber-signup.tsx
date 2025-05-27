"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SubOption {
  id: string
  label: string
}

interface MainOption {
  id: string
  label: string
  subOptions: SubOption[]
}

export default function JobberSignup() {
  const [selectedParent, setSelectedParent] = useState<string | null>("new-business")
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>(["quote-invoice"])
  const [customText, setCustomText] = useState<string>("")

  const mainOptions: MainOption[] = [
    {
      id: "new-business",
      label: "I'm a new business getting set up",
      subOptions: [
        { id: "quote-invoice", label: "Create a professional quote or invoice" },
        { id: "website-booking", label: "Get a website or booking form" },
        { id: "learn-businesses", label: "Learn from other successful businesses" },
        { id: "support-workflow", label: "Understand how Jobber can support my workflow" },
        { id: "sample-setup", label: "Try a sample client/job setup" },
      ],
    },
    {
      id: "grow-business",
      label: "I want to grow my business",
      subOptions: [
        { id: "marketing-tools", label: "Get marketing and promotional tools" },
        { id: "customer-management", label: "Improve customer relationship management" },
        { id: "online-presence", label: "Build a stronger online presence" },
        { id: "referral-system", label: "Set up a referral system" },
        { id: "analytics-reporting", label: "Access business analytics and reporting" },
      ],
    },
    {
      id: "save-time",
      label: "I need to save time and get organized",
      subOptions: [
        { id: "scheduling", label: "Streamline scheduling and dispatching" },
        { id: "invoicing", label: "Automate invoicing and payments" },
        { id: "job-tracking", label: "Better job and project tracking" },
        { id: "team-management", label: "Organize team and employee management" },
        { id: "inventory", label: "Manage inventory and supplies" },
      ],
    },
    {
      id: "other",
      label: "Other",
      subOptions: [
        { id: "explore-features", label: "I want to explore all features" },
        { id: "specific-industry", label: "I have specific industry needs" },
        { id: "integration", label: "I need integrations with other tools" },
        { id: "custom-solution", label: "I need a custom solution" },
        { id: "custom-input", label: "Tell us more about your specific needs" },
      ],
    },
  ]

  const handleParentSelect = (parentId: string) => {
    if (selectedParent === parentId) {
      // If clicking the same parent, collapse it
      setSelectedParent(null)
      setSelectedSubOptions([])
    } else {
      // Select new parent and clear sub-selection
      setSelectedParent(parentId)
      setSelectedSubOptions([])
    }
  }

  const handleSubOptionToggle = (subOptionId: string) => {
    setSelectedSubOptions((prev) => {
      if (prev.includes(subOptionId)) {
        return prev.filter((id) => id !== subOptionId)
      } else {
        return [...prev, subOptionId]
      }
    })
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="flex-1 max-w-2xl p-8 lg:p-12">
        <div className="max-w-lg">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-slate-800">JOBBER</span>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="w-16 h-1 bg-green-500 rounded"></div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Let's get Jobber working for you</h1>
            <p className="text-slate-600 text-lg">
              You're in! Now that your free trial has started, tell us what's top of mind so we can tailor Jobber to
              your needs.
            </p>
          </div>

          {/* Progressive reveal options */}
          <div className="space-y-4">
            {mainOptions.map((option) => {
              const isSelected = selectedParent === option.id
              const isExpanded = isSelected

              return (
                <div key={option.id}>
                  {/* Parent option */}
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-2 border-green-500 bg-green-50"
                        : selectedParent
                          ? "border border-slate-200 opacity-40 hover:opacity-60"
                          : "border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                    onClick={() => handleParentSelect(option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-green-500"
                              : selectedParent
                                ? "border-2 border-slate-200"
                                : "border-2 border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`font-semibold transition-all duration-300 ${
                            isSelected ? "text-slate-800" : selectedParent ? "text-slate-400" : "text-slate-700"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-all duration-300 ${
                          isSelected ? "text-slate-400" : selectedParent ? "text-slate-300" : "text-slate-400"
                        } ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </Card>

                  {/* Sub-options (progressive reveal) */}
                  {isExpanded && (
                    <div className="ml-6 mt-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
                      <p className="text-slate-600 mb-3 font-medium">What kind of help are you looking for?</p>
                      {option.subOptions.map((subOption) => {
                        if (subOption.id === "custom-input") {
                          return (
                            <div key={subOption.id} className="space-y-2">
                              <Button
                                variant={selectedSubOptions.includes(subOption.id) ? "default" : "outline"}
                                className={`w-full justify-start text-left h-auto py-3 px-4 ${
                                  selectedSubOptions.includes(subOption.id)
                                    ? "bg-slate-800 text-white hover:bg-slate-700"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSubOptionToggle(subOption.id)
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                      selectedSubOptions.includes(subOption.id)
                                        ? "bg-white border-white"
                                        : "border-slate-400"
                                    }`}
                                  >
                                    {selectedSubOptions.includes(subOption.id) && (
                                      <Check className="w-3 h-3 text-slate-800" />
                                    )}
                                  </div>
                                  {subOption.label}
                                </div>
                              </Button>
                              {selectedSubOptions.includes(subOption.id) && (
                                <div className="ml-7 animate-in slide-in-from-top-2 duration-200">
                                  <textarea
                                    value={customText}
                                    onChange={(e) => setCustomText(e.target.value)}
                                    placeholder="Please describe your specific needs or goals..."
                                    className="w-full p-3 border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    rows={3}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        }

                        return (
                          <Button
                            key={subOption.id}
                            variant={selectedSubOptions.includes(subOption.id) ? "default" : "outline"}
                            className={`w-full justify-start text-left h-auto py-3 px-4 ${
                              selectedSubOptions.includes(subOption.id)
                                ? "bg-slate-800 text-white hover:bg-slate-700"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSubOptionToggle(subOption.id)
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  selectedSubOptions.includes(subOption.id)
                                    ? "bg-white border-white"
                                    : "border-slate-400"
                                }`}
                              >
                                {selectedSubOptions.includes(subOption.id) && (
                                  <Check className="w-3 h-3 text-slate-800" />
                                )}
                              </div>
                              {subOption.label}
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right side - Dark screen */}
      <div className="flex-1 bg-slate-900 min-h-screen">{/* Empty dark background */}</div>
    </div>
  )
}
