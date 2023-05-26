export function useRules() {

  const isRequired = [(v: string) => !!v || 'Field is required']

  return {
    isRequired,
  }
}