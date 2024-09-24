export const applyAnimation = async (self: HTMLElement, name: 'enter' | 'leave') => {
  const modifyClasses = (method: 'remove' | 'add', ...classes: (string | null | undefined)[]) => {
    for (const c of classes.join(' ').split(' ').filter(Boolean)) {
      self.classList[method](c);
    }
  };
  const next = name === 'enter' ? 'leave' : 'enter';
  try {
    modifyClasses('remove', self.getAttribute(`${name}From`));
    modifyClasses('add', self.getAttribute(`${name}To`));
    await Promise.all(self.getAnimations({ subtree: true }).map(animation => animation.finished))
      .then(() => modifyClasses('remove', self.getAttribute(name), self.getAttribute(`${name}To`)))
      .then(() => modifyClasses('add', self.getAttribute(next), self.getAttribute(`${next}From`)));
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw error;
    }
  }
};
