/** Add props to the hover element */
export const setChildrenProps = (
  id: string,
  setActive: React.Dispatch<string>,
) => ({
  onMouseOver: (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(id);
  },
});
