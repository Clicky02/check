import { createContext, ReactNode, useContext, useState } from 'react';

const DnDContext = createContext<[string, (type: string) => void]>(['', (_: string) => { }]);

type DnDProviderProps = {
    children: ReactNode;
}

export function DnDProvider({ children }: DnDProviderProps) {
    const [type, setType] = useState<string>('');

    return (
        <DnDContext.Provider value={[type, setType]} >
            {children}
        </DnDContext.Provider>
    );
}


export const useDnD = () => {
    return useContext(DnDContext);
}