const convertNameToFirebaseStyle = (name: string) => name.toLowerCase().split(' ').join('_');

export { convertNameToFirebaseStyle };
