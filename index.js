const bars = document.querySelectorAll(".bar");
const float = document.querySelector(".floating");
const floatAmount = document.getElementById("floating__amount");

// Change heights of each bar based on data.json file
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const max = data.reduce((prev, current) => {
      return prev.amount > current.amount ? prev : current;
    }, Number.NEGATIVE_INFINITY);

    data.forEach((ele) => {
      let temp = document.getElementById(ele.day);
      temp.style.height =
        String(Math.round((ele.amount / max.amount) * 100)) + "%";
    });

    // Display floating price when mouse hovers over a bar in the graph and move it above the bar
    bars.forEach((ele, index) => {
      ele.addEventListener("mouseover", () => {
        float.style.display = "block";
        float.style.left =
          String(
            ele.offsetLeft - (float.offsetWidth / 2 - ele.offsetWidth / 2)
          ) + "px";
        float.style.top =
          String(ele.offsetTop - (float.offsetHeight + 8)) + "px";
        floatAmount.textContent = `$${data[index].amount}`;
      });
    });

    bars.forEach((ele) => {
      ele.addEventListener("mouseout", () => {
        float.style.display = "none";
      });
    });
  });

// Highlight todays bar with the color of cyan
const todayDate = new Date();
const dayOfWeek = {
  0: "sun",
  1: "mon",
  2: "tues",
  3: "wed",
  4: "thur",
  5: "fri",
  6: "sat",
};

const today = document.getElementById(dayOfWeek[todayDate.getDay()]);
today.classList.add("today-bar");
today.classList.remove("bar");
