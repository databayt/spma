"use client"

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

export interface CustomNavigation {
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
}

export interface WizardValidationContextType {
  isNextDisabled: boolean
  setIsNextDisabled: (disabled: boolean) => void
  enableNext: () => void
  disableNext: () => void
  customNavigation?: CustomNavigation
  setCustomNavigation: (navigation?: CustomNavigation) => void
}

const WizardValidationContext = createContext<
  WizardValidationContextType | undefined
>(undefined)

export function useWizardValidation(): WizardValidationContextType {
  const context = useContext(WizardValidationContext)
  if (!context) {
    throw new Error(
      "useWizardValidation must be used within a WizardValidationProvider"
    )
  }
  return context
}

interface WizardValidationProviderProps {
  children: ReactNode
}

export function WizardValidationProvider({
  children,
}: WizardValidationProviderProps) {
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [customNavigation, setCustomNavigation] = useState<
    CustomNavigation | undefined
  >(undefined)

  const enableNext = useCallback(() => {
    setIsNextDisabled(false)
  }, [])

  const disableNext = useCallback(() => {
    setIsNextDisabled(true)
  }, [])

  const value: WizardValidationContextType = useMemo(
    () => ({
      isNextDisabled,
      setIsNextDisabled,
      enableNext,
      disableNext,
      customNavigation,
      setCustomNavigation,
    }),
    [isNextDisabled, enableNext, disableNext, customNavigation]
  )

  return (
    <WizardValidationContext.Provider value={value}>
      {children}
    </WizardValidationContext.Provider>
  )
}
