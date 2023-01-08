export type Tab = 'reported_cases' | 'ranked_charts'

export interface TabsProps {
    active: Tab;
    setActive: (type: Tab) => void
}