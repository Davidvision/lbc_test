const lbcTeams = Object.freeze({
  coreQualité: 'Core Qualité',
  android: 'Android',
});

const lbcTeamsEnum = Object.keys(lbcTeams).reduce((array, key) => {
  array.push(lbcTeams[key]);
  return array;
}, []);

const initDevs = [
  { id: 1, nom: 'Fanch', team: lbcTeams.coreQualité },
  { id: 2, nom: 'Romain', team: lbcTeams.coreQualité },
  { id: 3, nom: 'Saad', team: lbcTeams.android },
  { id: 4, nom: 'Renaud', team: lbcTeams.coreQualité },
  { id: 5, nom: 'Hugo', team: lbcTeams.coreQualité },
  { id: 6, nom: 'Hugo-K', team: lbcTeams.coreQualité },
];

module.exports = { lbcTeams, lbcTeamsEnum, initDevs };
