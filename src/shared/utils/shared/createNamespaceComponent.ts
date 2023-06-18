import type { JSXElementConstructor } from "react";

/**
 * Create a namespace component from a root component and multiple member components
 *
 * @example
 * ```tsx
 *     const _A = () => <p>Hello</p>;
 *     const B = () => <p>World!</p>;
 *     const A = createNamespaceComponent(_A, {
 *         B: B,
 *     });
 *     const Page = () => {
 *         return (
 *             <>
 *                 <A />
 *                 <A.B />
 *             </>
 *         );
 *     }; // returns <><p>Hello</p><p>World!</p></>
 * ```
 * @param rootComponent - The root component.
 * @param namespaceMembers - The namespace's members. They can be anything.
 * @returns
 */
export const createNamespaceComponent = <
  T extends JSXElementConstructor<any>,
  U extends Record<string, any>,
>(
  rootComponent: T,
  namespaceMembers: U,
): T & U => Object.assign(rootComponent, namespaceMembers);
