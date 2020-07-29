/* eslint-disable */
jQuery(document).ready(() => {
  let taskList = [];
  let pageCount = 1;
  let currentPage = 0;
  const SHOW_ALL = 0;
  const SHOW_ACTIVE = 1;
  const SHOW_COMLETED = 2;

  let filterTab = "show-all";

  $(document).on('click', '#add-task-button', () => {
    const tabKiller = $('#new-task-text').val();
    let taskText = tabKiller.trim();
    taskText = _.escape([taskText]);
    if (taskText.length != 0) {
      const taskObject = {};
      idTemp = Date.now();
      taskObject.text = taskText;
      taskObject.id = idTemp;
      taskObject.status = false;
      taskList.push(taskObject);
      $('#new-task-text').val('');
      $('#to-do-list').children().remove();
      pageCount = Math.ceil(taskList.length / 5);
      paginationRender();
    } else {
      $('#new-task-text').val('');
    }
  });

  function renderPaginationButton() {
    for(let page = 0; page < pageCount; page++) {
      const activeBtnStyle = (page === currentPage) ? "activeButtonStyle" : '';
      $('#paginationList').append(`
          <button class="paginationButton ${activeBtnStyle}" id=${page+1}>
            ${page+1}
          </button>
          <span></span>`);
    }
  }

  function paginationRender() {
    renderPaginationButton();
    const sliceStart = (currentPageRender - 1) * 5;
    const end = sliceStart + 5;
    const filteredTasks = taskList.filter((task) =>
      filter === "show-all" ||
      (filter === "show-active" && task.status === false) ||
      (filter === "show-comleted" && task.status === true)
    );
    const arrayForPaginationRender = filteredTasks.slice(sliceStart, end);
    render(arrayForPaginationRender);
  }

  $(document).on('click', '.paginationButton', function () {
    currentPage = this.id;
    paginationRender();
  });

  function activeTaskHolder() {
    $('#taskCounter >').remove();
    const activeTasks = taskList.filter((e) => e.status === false);
    let taskCounterText = 'task';
    if (activeTasks.length > 0) {
      $('.pick-all-button').attr('style', 'opacity: 1;');
      if (activeTaskHolder > 1) taskCounterText = 'tasks';
      $('#taskCounter').append(`<span>Need do ${activeTaskHolder} ${taskCounterText}</span>`);
    };
  }

  function render(array) {
    $('#to-do-list').children().remove();

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
          <br/>
        </li>`;
      });
    }
    $('#to-do-list').append(tasksHTML);
    taskDecorate();
    activeTaskHolder();
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

  function GetTempPageCounter() {
    const tempPageCounter = parseInt($('.activeTabStyle').attr('id'));
    return tempPageCounter;
  }

  $(document).on('click', '#pick-all-button', () => {
    const AllTaskCheckboxList = $('.task-check');
    $.each(AllTaskCheckboxList, function (index, value) {
      const tempAllTaskStringIdHolder = $(this).parent().attr('id');
      const tempAllTaskIndexHolder = GetIndexElem(tempAllTaskStringIdHolder);
      const tempArrayElement = taskList[tempAllTaskIndexHolder];
      if (tempArrayElement.status === false) {
        tempArrayElement.status = true;
      }
      console.log(taskList);
    });

    tempPageCounter = GetTempPageCounter();

    $('#to-do-list').children().remove();
    paginationRender(taskList, tempPageCounter);
    activeTaskHolder();
  });

  $(document).on('click', '.task-delete-button', function () {
    const tempElmTaskIdHolder = $(this).parent();
    tempTaskStringIdHolder = tempElmTaskIdHolder.attr('id');
    const deleteTaskArrayIndexHolder = GetIndexElem(tempTaskStringIdHolder);
    const tempCurrentPageHldr = currentPage;
    const tempIdCurrentPageButHldr = currentPage;
    taskList.splice(deleteTaskArrayIndexHolder, 1);

    $(this).parent().remove();

    if (taskList.length < tempCurrentPageHldr * 5 - 1) {
      $(`${tempIdCurrentPageButHldr}`).remove();
    }
    $('#to-do-list').children().remove();
    const tempPageCounter = GetTempPageCounter();
    paginationRender(taskList, tempPageCounter);
    activeTaskHolder();
  });

  $('#body-id').keydown((event) => {
    const tabKiller = $('#new-task-text').val();
    let taskText = tabKiller.trim();
    taskText = _.escape([taskText]);
    if (taskText.length != 0) {
      if (event.keyCode == 13) {
        $('#to-do-list').children().remove();
        $('#add-task-button').click();
      }
    }
  });

  $(document).on('dblclick', '.task-txt', function () {
    const tempSpanParentStringIdHolder = $(this).parent().attr('id');
    const indexSpanParent = GetIndexElem(tempSpanParentStringIdHolder);
    $(this).replaceWith(`<input id=temp-txt-editor  value="${this.innerText}" type=text> </input>`);

    $('#body-id').keydown((event) => {
      if (event.keyCode == 13) {
        const tempInputValueHolder = $('#temp-txt-editor').val();
        taskList[indexSpanParent].text = tempInputValueHolder;
        $('#to-do-list').children().remove();
        render(taskList);//
      }
    });
  });

  $(document).on('click', '.task-check', function () {
    $(this).siblings('.task-txt').addClass('done-task-decoration');
    const tempElmCheckboxIdHolder = $(this).parent();
    const tempCheckboxParentStringIdHolder = tempElmCheckboxIdHolder.attr('id');
    const taskArrayIndexHolder = GetIndexElem(tempCheckboxParentStringIdHolder);
    const tempArrayElement = taskList[taskArrayIndexHolder];
    if ($(this).is(':checked')) {
      tempArrayElement.status = true;
    } else {
      tempArrayElement.status = false;
    }
    taskList[taskArrayIndexHolder] = tempArrayElement;
    activeTaskHolder();
  });

  $(document).on('click', '#delete-all-completeTask-button', () => {
    const tempActiveTaskHolder = $(':checkbox:checked');
    if (tempActiveTaskHolder.length > 0) {
      $.each(tempActiveTaskHolder, (index, value) => {
        const tempObjectArrayHolder = $(value).parent();
        const tempTaskStringIdHolder = tempObjectArrayHolder.attr('id');
        taskArrayDeleteCompleteTaskIndexHolder = GetIndexElem(tempTaskStringIdHolder);
        taskList.splice(taskArrayDeleteCompleteTaskIndexHolder, 1);
      });

      $('#to-do-list').children().remove();
      render(taskList);//
    } else {
      $('#to-do-list').children().remove();
      $('#to-do-list').append('<span class=all-task-done-alert> To delete completed tasks, you must do them first! </span>');
    }
  });

  $(document).on('click', '#show-all-tasks', function () {
    styleForActiveButton($(this));
    $('#to-do-list').children().remove();
    if (taskList.length > 1) {
      $('#to-do-list').children().remove();
      const tempPageCounter = GetTempPageCounter();
      paginationRender(taskList, tempPageCounter);
    } else {
      $('#to-do-list').children().remove();
      $('#to-do-list').append('<span class=all-task-done-alert> Hurry to add new tasks to your to-do list! </span>');
    }
  });

  $(document).on('click', '#show-actual-tasks', function () {
    styleForActiveButton($(this));
    $('#to-do-list').children().remove();

    const tempPageCounter = GetTempPageCounter();
    const tempCounterActiveTaskHolder = taskList.filter((e) => e.status === false);
    console.log(tempCounterActiveTaskHolder);
    if (tempCounterActiveTaskHolder.length > 0) {
      paginationRender(tempCounterActiveTaskHolder, tempPageCounter);
      console.log('1');
    } else {
      $('#to-do-list').children().remove();
      $('#to-do-list').append('<span class=all-task-done-alert> Yooo dude, all task is done. Your realy awecome! </span>');
    }

    $(document).on('click', '.task-check', function () {
      $(this).parent().remove();
    });
  });

  $(document).on('click', '#show-complete-tasks', function () {
    styleForActiveButton($(this));
    $('#to-do-list').children().remove();
    const tempPageCounter = GetTempPageCounter();
    const tempCounterDoneTaskHolder = taskList.filter((e) => e.status === true);
    if (tempCounterDoneTaskHolder.length > 0) {
      paginationRender(tempCounterDoneTaskHolder, tempPageCounter);
    } else {
      $('#to-do-list').children().remove();
      $('#to-do-list').append('<span class=all-task-done-alert> Bro you haven\'t done noone task :( </span>');
    }
  });

  function GetIndexElem(stringId) {
    const TaskId = parseInt(stringId);
    const TaskIndex = taskList.findIndex((item) => item.id == TaskId);
    return TaskIndex;
  }
  function styleForActiveButton(elm) {
    $('.activeButtonStyle').removeClass('activeButtonStyle');
    elm.addClass('activeButtonStyle');
  }
  function styleForActiveTab(elm) {
    $('.activeTabStyle').removeClass('activeTabStyle');
    elm.addClass('activeTabStyle');
  }
});
