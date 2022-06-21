let entryList = [];
let badList = [];
const weekHours = 7 * 24;

const handleOnSubmit = (e) => {
  const formDt = new FormData(e); // get form data. formDt has all the data from the form. e is the event.
  //   console.log(formDt);
  const task = formDt.get("task"); // get the task from the form.
  const hours = +formDt.get("hours"); // get the hours from the form.
  //   console.log(task, hours);
  const obj = { task, hours }; // create an object with the task and hours. obj is used to add to the entryList.
  entryList.push(obj); // add the obj to the entryList.
  //   console.log(entryList);
  const ttlHours = getTotalHours(); // get the total hours from the entryList.
  //   console.log(ttlHours);

  if (ttlHours + hours > weekHours) {
    return alert("You have exceeded the weekly hours.");
  }
  //   console.log(entryList);
  display(entryList);
};

// getTotalHours returns the total hours from the entryList on the page.
const getTotalHours = () => {
  const ttlEntryList = entryList.reduce((acc, item) => acc + item.hours, 0); //reduce adds the hours from the entryList.
  // acc is the accumulator. acc is the total hours. item is the item in the entryList.
  // item is the current item in the array.
  const ttlBadList = badList.reduce((acc, item) => acc + item.hours, 0); //reduce adds the hours from the badList.
  //   when the item is deleted from entryList or badList, the total hours is updated.
  const total = ttlEntryList + ttlBadList; // total is the total hours.

  document.getElementById("totalHours").innerText = total; // display the total hours on the page.
  return total;
};

// display the entryList on the page.
const display = (taskArg) => {
  let str = "";
  taskArg.map((item, i) => {
    str += ` <tr>
    <td>
      ${item.task}
    </td>
    <td>
        ${item.hours} hrs
    </td>
    <td>
        <button class="btn btn-danger">
            <i onclick=(handleOnDeleteEntryList(${i})) class="fa-solid fa-trash-can"></i>

        </button>
        <button onclick=(switchToBadList(${i})) class="btn btn-success">

            <i class="fa-solid fa-arrow-right"></i>
        </button>
    </td>
</tr>`;
  });
  document.getElementById("entryList").innerHTML = str;
};

//handleOnDeleteEntryList deletes the entry from the entryList.
const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are you sure you want to delete this entry?")) {
    return;
  }
  const newEntryList = entryList.filter((item, index) => index !== i);
  entryList = newEntryList;
  display(entryList);
};

// switchToBadList moves the entry from the entryList to the badList.
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1); //splice removes the item from the entryList.
  badList.push(itemToBeSwitched[0]); // push the item to the badList.
  display(entryList);
  displayBadList(badList);
};

// displayBadList displays the badList on the page.
const displayBadList = (arg) => {
  let str = "";
  arg.map((item, i) => {
    str += `                             <tr>
          <td>
             ${item.task}
          </td>
          <td>
              ${item.hours} hrs
          </td>
          <td>
              <button onclick=(switchToEntryList(${i})) class="btn btn-warning">
                  <i class="fa-solid fa-arrow-left"></i>
  
              </button>
              <button onclick=(handleOnDeleteBadList(${i})) class="btn btn-danger">
  
                  <i class="fa-solid fa-trash-can"></i>
  
              </button>
          </td>
      </tr>`;
  });
  document.getElementById("badList").innerHTML = str;
};

// switchToEntryList moves the entry from the badList to the entryList.
const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1); //splice removes the item from the badList.
  entryList.push(itemToBeSwitched[0]); // push the item to the entryList.
  display(entryList);
  displayBadList(badList);
};

// handleOnDeleteBadList deletes the entry from the badList.
const handleOnDeleteBadList = (i) => {
  if (!confirm("Are you sure you want to delete this entry?")) {
    return;
  }
  const filterArg = badList.filter((item, index) => index !== i);
  badList = filterArg;
  displayBadList(badList);
  //   console.log(i);
};

// badListTotalHours returns the total hours from the badList.
const badListTotalHours = () => {
  const ttlBadList = badList.reduce((acc, item) => acc + item.hours, 0); //reduce adds the hours from the badList.
  const total = ttlBadList;
  console.log(total);
  document.getElementById("badTtlHr").innerText = total; // display the total hours on the page.
  return total;
};
