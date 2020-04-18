/**
 * our mock data use together with `fake-backend`
 */
let _sportsBooksData = [
 {
  id: 1,
  compaign_name: 'Bet 365',
  compaign_img: 'bet365-logo.jpg',
  compaign_url: 'https://www.bet365.com',
  rating: 5,
  review_link: 'https://www.google.com/search?q=reviewBet+365', // this will be printed instead
  message: '#1#- Exclusive -#1# #2#$200#2# Free Bet',
  message_short: 'Free Bet #1#$250#1#', // mobile short message
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 2,
  compaign_name: 'Sports Interaction',
  compaign_img: 'sports-interaction-logo.jpg',
  compaign_url: 'https://www.sportsinteraction.com',
  rating: 4,
  review_link: '', // when not set will generate new google search link
  message: '#1#- Exclusive -#1# Bonus up to #2#$200#2#',
  message_short: 'Bonus #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 3,
  compaign_name: 'Power Play Sports',
  compaign_img: 'powerplaysports-logo.jpg',
  compaign_url: 'https://www.powerplay.com',
  rating: 3,
  review_link: 'https://www.google.com/search?q=Power+Play+Sports',
  message: '#1#- Exclusive -#1# #2#$200#2# Free Bet',
  message_short: 'Free Bet #1#$250#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 4,
  compaign_name: 'Betway',
  compaign_img: 'betway-logo.jpg',
  compaign_url: 'https://betway.com',
  rating: 3,
  review_link: '',
  message: '100% Sign Up Bonus Up to #2#$200#2#',
  message_short: 'Bonus #1#$250#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 5,
  compaign_name: 'Spin Sports',
  compaign_img: 'spinsports-logo.jpg',
  compaign_url: 'https://www.spinsports.com',
  rating: 2,
  review_link: '',
  message: '#1#- Exclusive -#1# Up to #2#$500#2# Free Bet',
  message_short: 'Free Bet #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 6,
  compaign_name: 'Boodog',
  compaign_img: 'bodog-logo.jpg',
  compaign_url: 'https://www.bodog.eu',
  rating: 5,
  review_link: '',
  message: '100% Sign Up Bonus Up to #2#$200#2#',
  message_short: 'Bonus #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 7,
  compaign_name: '888 Sports',
  compaign_img: '888spots-logo.jpg',
  compaign_url: 'https://www.888sport.com',
  rating: 1,
  review_link: '',
  message: '#1#- Exclusive -#1# #2#$200#2# Free Bet',
  message_short: 'Bonus #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 8,
  compaign_name: 'IO Sports',
  compaign_url: 'https://sportsbet.io',
  compaign_img: '',
  rating: 5,
  review_link: '',
  message: '100% Sign Up Bonus Up to #2#$200#2#',
  message_short: 'Bonus #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 9,
  compaign_name: 'LeoVegas',
  compaign_img: 'leovegas-logo.jpg',
  compaign_url: 'https://www.leovegas.com',
  rating: 5,
  review_link: '',
  message: '#1#- Exclusive -#1# Up to #2#$500#2# Free Bet',
  message_short: 'Bonus #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 },
 {
  id: 10,
  compaign_name: 'William Hill',
  compaign_img: 'william-hill-logo.jpg',
  compaign_url: 'https://www.williamhill.com',
  rating: 2,
  review_link: '',
  message: '100% Sign Up Bonus Up to #2#$200#2#',
  message_short: 'Bonus #1#$200#1#',
  play_message: 'Play Now',
  play_link: "#"
 }
];

// make {play_link} url same as  {compaign_url}
const sportsBooksData = _sportsBooksData.map(z => {
 z.play_link = z.compaign_url
 return z
})
export { sportsBooksData };
