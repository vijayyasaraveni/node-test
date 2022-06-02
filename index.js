var inquirer = require("inquirer");

const inputData = [];
const testCaseQuestion = [
  {
    type: "input",
    name: "test_case_count",
    message: "Please enter number of test cases e.g(t< 10)",
  },
];

const testDataQuestion = [
  {
    type: "input",
    name: "test_data",
    message:
      "Please enter test data like player1-age<SPACE>player1-pos<SPACE>player2-age<SPACE>player2-pos",
  },
];

function receiveUserInputData() {
  inquirer.prompt(testCaseQuestion).then((answer) => {
    console.log(answer.test_case_count);
    askTestData(answer.test_case_count);
  });
}

function askTestData(testCaseCount) {
  inquirer.prompt(testDataQuestion).then((answers) => {
    inputData.push(answers.test_data.trim());
    if (testCaseCount > 1) {
      testCaseCount = testCaseCount - 1;
      askTestData();
    } else {
      console.log("inputData: ", inputData);
      processUserInput(inputData);
    }
  });
}

function processUserInput(inputData) {
  inputData.map((dataset) => {
    const testDataArr = dataset.split(" ");
    checkGameResult(
      parseInt(testDataArr[0]),
      parseInt(testDataArr[1]),
      parseInt(testDataArr[2]),
      parseInt(testDataArr[3])
    );
  });
}

function checkGameResult(
  player1Age,
  player1Position,
  player2Age,
  player2Position
) {
  console.log(player1Age, player1Position, player2Age, player2Position);

  const ladderSize = getLadderSize(player1Position, player2Position);
  const ladderArray = new Array(ladderSize + 1);

  ladderArray[player1Position] = "X";
  ladderArray[player2Position] = "Y";

  const player1Direction = getPlayerDirection(player1Position, player2Position);
  const player2Direction = getPlayerDirection(player2Position, player1Position);

  //   console.log("player1Direction :::::", player1Direction);
  //   console.log("player2Direction :::::", player2Direction);

  const isPlayer1First = player1Age > player2Age ? 1 : 0;
  var player1CurrentPosition = player1Position;
  var player2CurrentPosition = player2Position;

  var positionDifference = getPositionDifference(
    player1CurrentPosition,
    player2CurrentPosition
  );

  while (positionDifference > 0) {
    if (positionDifference === 1 || positionDifference === 2) {
      if (isPlayer1First === 1) {
        ladderArray[player1CurrentPosition] = "";
        player1CurrentPosition =
          positionDifference === 1
            ? player1Direction === "DOWN"
              ? player1CurrentPosition - 1
              : player1CurrentPosition + 1
            : player1Direction === "DOWN"
            ? player1CurrentPosition - 2
            : player1CurrentPosition + 2;
        ladderArray[player1CurrentPosition] = "X";
        return displatResult("X");
        // console.log("1");
        // break;
      } else {
        ladderArray[player2CurrentPosition] = "";
        player2CurrentPosition =
          player2CurrentPosition === 1
            ? player2Direction === "DOWN"
              ? player2CurrentPosition - 1
              : player2CurrentPosition + 1
            : player2Direction === "DOWN"
            ? player2CurrentPosition - 2
            : player2CurrentPosition + 2;
        ladderArray[player2CurrentPosition] = "Y";
        return displatResult("Y");
        // console.log("0");
        // break;
      }
    } else {
      if (isPlayer1First) {
        // console.log("positionDifference :::::::", positionDifference);
        const player1StepValue = positionDifference % 2 === 0 ? 1 : 2;
        ladderArray[player1CurrentPosition] = "";
        player1CurrentPosition =
          player1Direction === "DOWN"
            ? player1CurrentPosition - player1StepValue
            : player1CurrentPosition + player1StepValue;
        ladderArray[player1CurrentPosition] = "x";

        if (
          checkPlayerWinStatus(player1CurrentPosition, player2CurrentPosition)
        ) {
          return displatResult("X");
          //   console.log("1");
          //   break;
        }
        positionDifference = getPositionDifference(
          player1CurrentPosition,
          player2CurrentPosition
        );

        if (positionDifference <= 2) {
          return displatResult("Y");
          //   console.log("0");
          //   break;
        }
        const player2StepValue = positionDifference % 2 === 0 ? 1 : 2;
        ladderArray[player2CurrentPosition] = "";
        player2CurrentPosition =
          player2Direction === "DOWN"
            ? player2CurrentPosition - player2StepValue
            : player2CurrentPosition + player2StepValue;

        if (
          checkPlayerWinStatus(player1CurrentPosition, player2CurrentPosition)
        ) {
          return displatResult("Y");
          //   console.log("0");
          //   break;
        }
      } else {
        const player2StepValue = positionDifference % 2 === 0 ? 1 : 2;
        ladderArray[player2CurrentPosition] = "";
        player2CurrentPosition =
          player2Direction === "DOWN"
            ? player2CurrentPosition - player2StepValue
            : player2CurrentPosition + player2StepValue;

        if (
          checkPlayerWinStatus(player1CurrentPosition, player2CurrentPosition)
        ) {
          return displatResult("Y");
          //   console.log("0");
          //   break;
        }

        positionDifference = getPositionDifference(
          player1CurrentPosition,
          player2CurrentPosition
        );

        if (positionDifference <= 2) {
          return displatResult("X");
          //   console.log("1");
          //   break;
        }

        const player1StepValue = positionDifference % 2 === 0 ? 1 : 2;
        ladderArray[player1CurrentPosition] = "";
        player1CurrentPosition =
          player1Direction === "DOWN"
            ? player1CurrentPosition - player1StepValue
            : player1CurrentPosition + player1StepValue;
        ladderArray[player1CurrentPosition] = "x";

        if (
          checkPlayerWinStatus(player1CurrentPosition, player2CurrentPosition)
        ) {
          return displatResult("X");
          //   console.log("1");
          //   break;
        }
      }

      positionDifference = getPositionDifference(
        player1CurrentPosition,
        player2CurrentPosition
      );
    }
    // console.log("player1CurrentPosition ::::::", player1CurrentPosition);
    // console.log("player2CurrentPosition ::::::", player2CurrentPosition);
  }
}

function checkPlayerWinStatus(player1CurrentPosition, player2CurrentPosition) {
  const positionDifference = getPositionDifference(
    player1CurrentPosition,
    player2CurrentPosition
  );
  if (positionDifference === 0) {
    return true;
  } else {
    false;
  }
}

function getPositionDifference(player1Position, player2Position) {
  const isPlayer1OnTop = player1Position > player2Position ? true : false;
  var positionDifference;
  if (isPlayer1OnTop) {
    positionDifference = player1Position - player2Position - 1;
  } else {
    positionDifference = player2Position - player1Position - 1;
  }
  return positionDifference;
}

function getPlayerDirection(position1, position2) {
  return position1 > position2 ? "DOWN" : "UP";
}
function getLadderSize(player1Position, player2Position) {
  return player1Position > player2Position ? player1Position : player2Position;
}

function displatResult(playerWonTheGame) {
  //adding this return statement to test the result from unit test cases
  if (playerWonTheGame === "X") {
    console.log(1);
    return 1;
  } else {
    console.log(0);
    return 0;
  }
}

receiveUserInputData();

module.exports = {
  checkGameResult,
  displatResult,
};
