import Config from './config';

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
  nonNewVerbs: (problem) => {
    return problem.pastVerbs.map(i => [problem.verbs[i], i]).filter(v => !!v[0]);
  },
  isValid: (problem, key) => {
    const valid = {
      description: () => !!problem.description,
      verbs: () => !!Utils.cleanArray(problem.verbs).length,
      pastVerbs: () => true,
      negativeVerbs: () => true,
      transformationVerbs: () => {
        if (!problem.pastVerbs.length) return true;
        const tVerbs = problem.transformationVerbs;
        const oldVerbs = Utils.nonNewVerbs(problem);
        return oldVerbs.every(([v, i]) => !(v && !tVerbs[i]));
      },
      name: () => !!problem.name,
      newName: () => !!problem.newName,
      pastDomino: () => !!problem.pastDomino,
      futureDomino: () => !!problem.futureDomino,
      problemPlanted: () => true
    }[key];
    return valid !== undefined ? valid() : true
  },
  isValidProblem: (problem) => {
    return Object.keys(problem).every(k => Utils.isValid(problem, k));
  },
  transformationSentence: (problem) => {
    const tVerbs = problem.transformationVerbs;
    const transformationVerbs = Object.keys(tVerbs).reduce((acc, id) => (
      acc = `${acc}${acc ? ', ' : ''}${problem.transformationVerbs[id]} (במקום ${problem.verbs[id]})`
    ), "");
    return transformationVerbs;
  },
  problemTypeSentence: (problem) => {
    if(problem.verbs.length === problem.pastVerbs.length) {
      return Config.solutionScreen.man.costumeConflict
    } else if (problem.pastVerbs.length === 0) {
      return Config.solutionScreen.man.newConflict
    } else {
      return Config.solutionScreen.man.hidingConflict
    }
  },
  problemToText: (problem) => {
    Utils.transformationSentence(problem);
    const past = problem.pastVerbs.reduce((acc,i) => (
      acc = `${acc}${acc ? ', ' : ''}${problem.verbs[i]}`
    ), "");
    const negative = problem.negativeVerbs.reduce((acc,i) => (
      acc = `${acc}${acc ? ', ' : ''}${problem.verbs[i]}`
    ), "");
    const { pages } = Config;
    let problemText = `${pages.problem.tab.name}: ${problem.description}\n`;
    problemText += `${pages.verbExtract.tab.name}: ${problem.verbs.join(',')}\n`;
    problemText += `${pages.pastVerbs.tab.name}: ${past}\n`;
    problemText += `${pages.negativeVerbs.tab.name}: ${negative}\n`;
    problemText += `${pages.transformation.tab.name}: ${Utils.transformationSentence(problem)}\n`;
    problemText += `${pages.name.tab.name}: ${problem.name}\n`;
    problemText += `${pages.newName.tab.name}: ${problem.newName}\n`;
    problemText += `${pages.pastDomino.tab.name}: ${problem.pastDomino}\n`;
    problemText += `${pages.futureDomino.tab.name}: ${problem.futureDomino}\n`;
    problemText += `${pages.problemPlanted.tab.name}: ${problem.problemPlanted}\n`;
    return problemText;
  },
  problemToSubject: (problem) => {
    return `${Config.problemScreen.problemSubject} ${problem.name}`;
  }
}

export default Utils;
