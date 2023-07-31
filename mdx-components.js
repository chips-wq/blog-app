
// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components) {
    return {
        h1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
        p: ({ children }) => <p className="text-lg">{children}</p>,
        ...components,
    }
}
