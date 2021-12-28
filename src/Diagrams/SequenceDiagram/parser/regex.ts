export const interactionLineRegex = [
  /(?<from>.+)--(?<action>.+)-->(?<to>.+)/i,
  /(?<to>.+)<--(?<action>.+)--(?<from>.+)/i,
  /(?<from>.+) call(s*) (?<action>.+) on (?<to>.+)/i,
  /(?<from>.+) return(s*) (?<action>.+) to (?<to>.+)/i
];
