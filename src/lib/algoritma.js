// digunakan untuk menghitung priority weight menggunakan rumus
const calculatePriorityweight = (
  remainingDays,
  remainingHours,
  score,
  complexity,
  timeSpent
) => {
  // Hitung bobot prioritas
  const priorityWeight =
    (remainingDays * 24 + remainingHours) / (score + complexity + timeSpent);
  return priorityWeight;
};

// melakukan isertion sort untuk melakukan pengurutan priority secara ascending
const insertionSortData = (dataNew) => {
  for (let i = 1; i < dataNew.length; i++) {
    let currentValue = dataNew[i];
    let j = i - 1;
    while (j >= 0 && dataNew[j].priority > currentValue.priority) {
      dataNew[j + 1] = dataNew[j];
      j--;
    }
    dataNew[j + 1] = currentValue;
  }
  return dataNew;
};

const pushDataToNewArray = (dataNew, dataTodo) => {
  for (let i = 0; i < dataTodo.length; i++) {
    const dataRemaining = searchRemainingData(dataTodo[i]);
    const newArray = {
      key: i,
      nameTask: dataTodo[i].nameTask,
      remaining: dataRemaining.remainingData,
      deadline: dataTodo[i].deadline,
      priority: Number(
        calculatePriorityweight(
          dataRemaining.remainingDays,
          dataRemaining.remainingHours,
          dataTodo[i].score,
          dataTodo[i].complexity,
          dataTodo[i].timeSpent
        )
      ),
    };
    dataNew.push(newArray);
  }
};

const searchRemainingData = (itemData) => {
  const deadlineDate = new Date(itemData.deadline);
  deadlineDate.setHours(23, 59, 59, 999);
  const now = new Date();
  console.log(now + deadlineDate);
  const timeDifference = deadlineDate - now;
  // Hitung sisa hari dan jam
  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor(
    ((timeDifference % (1000 * 60 * 60 * 24)) + 4000) / (1000 * 60 * 60)
  );

  console.log(timeDifference);
  const remainingData = `${remainingDays} days ${remainingHours} hours`;

  return {
    remainingData,
    remainingDays,
    remainingHours,
  };
};

const bubleSortString = (dataNew) => {
  let temp;
  // Sorting menggunakan bubble sort untuk deadline secara ascending
  for (let j = 0; j < dataNew.length - 1; j++) {
    for (let i = j + 1; i < dataNew.length; i++) {
      if (dataNew[j].deadline.localeCompare(dataNew[i].deadline) > 0) {
        temp = dataNew[j];
        dataNew[j] = dataNew[i];
        dataNew[i] = temp;
      }
    }
  }

  return dataNew;
};

const pushDataToNewArrayKnapSack = (dataNew, dataTodo) => {
  for (let i = 0; i < dataTodo.length; i++) {
    const scoreTemp = transformScore(dataTodo[i].score);
    const newArray = {
      key: i,
      nameTask: dataTodo[i].nameTask,
      duration: dataTodo[i].timeSpent,
      score: scoreTemp,
      density: scoreTemp / dataTodo[i].timeSpent,
      knapsack: 0,
    };
    dataNew.push(newArray);
  }
};

//untuk melakukan sort secara descending dengan data density
const sortSelectinDataDuration = (dataNew) => {
  for (let i = 0; i < dataNew.length - 1; i++) {
    let highest = i;
    for (let j = i + 1; j < dataNew.length; j++) {
      if (dataNew[j].density > dataNew[highest].density) {
        highest = j;
      }
    }
    if (highest !== i) {
      // Swapping data
      [dataNew[i], dataNew[highest]] = [dataNew[highest], dataNew[i]];
    }
  }
  return dataNew;
};

function transformScore(originalScore) {
  // Lakukan pengecekan kondisional untuk mengubah nilai score
  if (originalScore === 0) {
    return 70;
  } else if (originalScore === 1) {
    return 80;
  } else if (originalScore === 2) {
    return 100;
  } else {
    // Jika tidak memenuhi kondisi di atas, biarkan nilai score tetap
    return originalScore;
  }
}
const knapsackFractionalData = (dataNew, capacity) => {
  sortSelectinDataDuration(dataNew);
  let finalvalue = 0.0;
  // Melakukan looping semua data
  for (let i = 0; i < dataNew.length; i++) {
    // jika memunuhi syarat durasi masukkan semua durasi ke capacity
    if (dataNew[i].duration <= capacity) {
      capacity -= dataNew[i].duration;
      finalvalue += dataNew[i].score;
      //setting knapsack 1 karena diambil semuanya
      dataNew[i].knapsack = 1;
    }

    // Jika tidak memenuhi capacity cek apakan ada sisa sedikit
    //jika iya bisa dilakukan fractional
    //dan melakukan setting knapsacknya
    else {
      if (capacity != 0) {
        finalvalue += dataNew[i].score * (capacity / dataNew[i].duration);
        dataNew[i].knapsack = capacity / dataNew[i].duration;
      }
      break;
    }
  }
  // Returning final value
  return finalvalue;
};
export {
  pushDataToNewArray,
  pushDataToNewArrayKnapSack,
  insertionSortData,
  bubleSortString,
  knapsackFractionalData,
};
