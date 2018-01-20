const Utils = {
  joinWithCommas: (arr, max = undefined) => {
    if (max) {
      return `${arr.slice(0, max).reduce((acc, i) => `${acc}, ${i}`)} ..`;
    } else {
      return arr.reduce((acc, i) => `${acc}, ${i}`);
    }
  },
  truncate: (str, length) => {
    if (str.length > length) {
      return `${str.substring(0, length)} ..`;
    } else {
      return str;
    }
  },
  indexToText: (indexes, verbs) => {
    return indexes.length ? Utils.joinWithCommas(indexes.map(i => verbs[i])) : "";
  },
  cloneProblem: (problem, update = {}) => {
    return {
      ...problem,
      verbs: problem.verbs.slice(0),
      pastVerbs: problem.pastVerbs.slice(0),
      negativeVerbs: problem.negativeVerbs.slice(0),
      transformationVerbs: {
        ...problem.transformationVerbs
      },
      ...update
    };
  },
  objectToArr: (obj) => {
    return Object.keys(obj).map(k => obj[k]);
  },
  cleanArray: (actual) => {
    var newArray = [];
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  },
  isValid: (problem, key) => {
    return {
      description: () => !!problem.description,
      verbs: () => !!Utils.cleanArray(problem.verbs).length,
      pastVerbs: () => true,
      negativeVerbs: () => true,
      transformationVerbs: () => {
        const tVerbs = problem.transformationVerbs;
        const cleanVerbs = Utils.cleanArray(problem.verbs);
        return cleanVerbs.every((v, i) => !(v && !tVerbs[i]));
      },
      name: () => !!problem.name,
      newName: () => !!problem.newName,
      pastDomino: () => !!problem.pastDomino,
      futureDomino: () => !!problem.futureDomino
    }[key]();
  }
}

export default Utils;
