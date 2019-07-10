const outputs = [];
const predictionPoint = 350;
const k =6;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);

}

function runAnalysis() {
  // Write code here to analyze stuff
  const bucket = _.chain(outputs)
	  .map(row => [dist4mPoint(row[0]), row[3]]) //absolute difference and bucket ball fell into
	  .sortBy(row => row[0]) // sort by abs difference, from least to greatest
	  .slice(0, k) // take k number of results
	  .countBy(row => row[1]) // count how many have landed in what bucket
	  .toPairs() // to have in tuple form
	  .sortBy(row => row[0]) // sorting by bucket number
	  .last() // picking out the last result ie the bucket with the highest number of balls in it
	  .first() // taking the bucket number
    .parseInt() // converting it from string to integer
    .value() // terminated the chain
    
  console.log('Ball released at 350 will likely fall in bucket ', bucket);
}

function dist4mPoint (point) {
  // getting absolute difference from drop point and to-be-predicted point
return Math.abs(point - predictionPoint);
}
