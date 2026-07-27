import { isEnabled, optionalEnv } from './env'

/**
 * Neo4j holds the category graph: brands, positions, claims and the edges between
 * them. Install the `neo4j-driver` package when you enable it.
 */
export const graphEnabled = () => isEnabled('NEO4J_URI', 'NEO4J_USER', 'NEO4J_PASSWORD')

export function graphConfig() {
  return {
    uri: optionalEnv('NEO4J_URI'),
    user: optionalEnv('NEO4J_USER'),
    password: optionalEnv('NEO4J_PASSWORD'),
    database: optionalEnv('NEO4J_DATABASE') ?? 'neo4j',
  }
}
