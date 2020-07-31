jQuery(document).ready(() => {
  let taskList = [];
  const doneTasks = [];
  let currentPage = 0;
  const SHOW_ALL = "allTab";
  const SHOW_ACTIVE = "activeTab";
  const SHOW_COMPLETED = "completeTab";

  let filterTab = SHOW_ALL;

  function getIndexElem(stringId) {
    const taskId = parseInt(stringId, 10);
    const taskIndex = taskList.findIndex((item) => item.id === taskId);
    return taskIndex;
  }
  function clearCheckAll() {
    $('#pick-all-button').prop('checked', false);
  }
  function styleForActiveTab(element) {
    $('.tab').removeClass('active-tab-style');
    element.addClass('active-tab-style');
  }

  function renderPaginationButton(btnCount) {
    let buttonHtml="";
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= btnCount) {
      currentPage = btnCount - 1;
    }
    for (let page = 0; page < btnCount; page += 1) {
      const activeBtnStyle = (page === currentPage) ? 'activeButtonStyle' : '';
      buttonHtml+=`
          <button class="paginationButton ${activeBtnStyle}" id=${page}>
            ${page + 1}
          </button>
          <span></span>`;
    }
    $('#paginationList').html(buttonHtml);
  }

  function activeTaskHolder() {
    $('#taskCounter >').remove();
    const activeTasks = taskList.filter((element) => element.status === false);
    let taskCounterText = 'task';
    if (activeTasks.length === 0) {
      $('#pick-all-button').prop('checked', true);
    }
    if (activeTasks.length > 0) {
      $('#pick-all-button').prop('checked', false);
      $('.pick-all-button').attr('style', 'opacity: 1;');
      if (activeTasks > 1) taskCounterText = 'tasks';
      $('#taskCounter').append(`<span>Need do ${activeTasks.length} ${taskCounterText}</span>`);
    }
  }

  function taskDecorate() {
    taskList.forEach((task) => {
      if (task.status) {
        $(`#${task.id} .task-txt`).addClass('done-task-decoration');
      } else {
        $(`#${task.id}.task-txt`).removeClass('done-task-decoration');
      }
    });
  }

  function render(array) {
    let tasksHTML = '';
    if (array.length > 0) {
      array.forEach((task) => {
        let checked = '';
        if (task.status) {
          checked = 'checked';
        }

        tasksHTML += `
        <li class=list-decorate id=${task.id}>
          <input id=task-checkbox type=checkbox  ${checked} class=task-check >
            <span  class=task-txt white-space:pre-line word-break=break-all id=spanId>${task.text} </span>
          <input type=button class=task-delete-button value=Delete >
        </li>`;
      });
    }
    $('#to-do-list').html(tasksHTML);
    taskDecorate();
    activeTaskHolder();
  }

  function paginationRender() {
    const filteredTasks = taskList.filter((task) => filterTab === SHOW_ALL
    || (filterTab === SHOW_ACTIVE && task.status === false)
    || (filterTab === SHOW_COMPLETED && task.status === true));
    renderPaginationButton(Math.ceil(filteredTasks.length / 5));
    const sliceStart = (currentPage) * 5;
    const end = sliceStart + 5;
    const arrayForPaginationRender = filteredTasks.slice(sliceStart, end);
    render(arrayForPaginationRender);
  }

  $(document).on('click', '#add-task-button', () => {
    clearCheckAll();
    const tabKiller = $('#new-task-text').val();
    let taskText = tabKiller.trim();
    // eslint-disable-next-line no-undef
    taskText = _.escape([taskText]);
    if (taskText.length !== 0) {
      const taskObject = {};
      const idTemp = Date.now();
      taskObject.text = taskText;
      taskObject.id = idTemp;
      taskObject.status = false;
      taskList.push(taskObject);
      $('#new-task-text').val('');
      currentPage = Math.ceil(taskList.length / 5);
      $('#0').trigger('click');
      paginationRender();
    } else {
      $('#new-task-text').val('');
    }
  });
  // eslint-disable-next-line func-names
  $(document).on('click', '.paginationButton', function () {
    currentPage = parseInt(this.id, 10);
    paginationRender();
  });
  $(document).on('click', '#pick-all-button', () => {
    if ($('#pick-all-button').is(':checked')) {
      // eslint-disable-next-line func-names
      $.each(taskList, function () {
        this.status = true;
      });
    } else {
      // eslint-disable-next-line func-names
      $.each(taskList, function () {
        this.status = false;
      });
    }

    paginationRender();
  });

  // eslint-disable-next-line func-names
  $(document).on('click', '.task-delete-button', function () {
    const elmTaskIdHolder = $(this).parent();
    const tempTaskStringIdHolder = elmTaskIdHolder.attr('id');
    const deleteTaskArrayIndex = getIndexElem(tempTaskStringIdHolder);
    taskList.splice(deleteTaskArrayIndex, 1);
    paginationRender();
  });

  $('#body-id').keydown((event) => {
    const tabKiller = $('#new-task-text').val();
    let taskText = tabKiller.trim();
    // eslint-disable-next-line no-undef
    taskText = _.escape([taskText]);
    if (taskText.length !== 0) {
      if (event.keyCode === 13) {
        $('#add-task-button').click();
      }
    }
  });

  $(document).on('blur', '.inputFocus', () => {
    paginationRender();
  });
  // eslint-disable-next-line func-names
  $(document).on('dblclick', '.task-txt', function () {
    const spanParentId = $(this).parent().attr('id');
    const indexSpanParent = getIndexElem(spanParentId);
    $(this).replaceWith(`<input id=temp-txt-editor class=inputFocus value="${this.innerText}" type=text> </input>`);
    $('#temp-txt-editor').trigger('focus');
    $('#body-id').keydown((event) => {
      if (event.keyCode === 13) {
        const tabKiller = $('#temp-txt-editor').val();
        let taskText = tabKiller.trim();
        // eslint-disable-next-line no-undef
        taskText = _.escape([taskText]);
        taskList[indexSpanParent].text = taskText;
        paginationRender();
      }
    });
  });

  $(document).on('click', '#delete-all-completeTask-button', () => {
    // eslint-disable-next-line func-names
    $.each(taskList, function () {
      if (this.status === true) {
        doneTasks.push(this);
      }
    });
    if (doneTasks.length > 0) {
      taskList = taskList.filter((element) => element.status === false);
      clearCheckAll();
    } else {
      $('#to-do-list').append('<span class=all-task-done-alert> To delete completed tasks, you must do them first! </span>');
    }
    paginationRender();
  });
  // eslint-disable-next-line func-names
  $(document).on('click', '.task-check', function () {
    clearCheckAll();
    const tempElmCheckboxIdHolder = $(this).parent();
    const tempCheckboxParentStringIdHolder = tempElmCheckboxIdHolder.attr('id');
    const taskArrayIndex = getIndexElem(tempCheckboxParentStringIdHolder);
    const tempArrayElement = taskList[taskArrayIndex];
    if ($(this).is(':checked')) {
      tempArrayElement.status = true;
    } else {
      tempArrayElement.status = false;
    }
    taskList[taskArrayIndex] = tempArrayElement;
    paginationRender();
  });

  // eslint-disable-next-line func-names
  $('.tab').on('click', function (event) {
    styleForActiveTab($(this));
    filterTab = this.id;
    console.log(this.id)
    if (taskList.length === 0) {
      $('#to-do-list').append('<span class=all-task-done-alert> Hurry to add new tasks to your to-do list! </span>');
    }
    paginationRender();
  });
});
