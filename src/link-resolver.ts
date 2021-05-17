function linkResolver(doc: { type: string; uid: string }): string {
  if (doc.type === 'resume') return `/resume/${doc.uid}`;

  return '/';
}

export default linkResolver;
