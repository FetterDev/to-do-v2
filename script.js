jQuery(document).ready(() => {
  let taskList = [];
  const doneTasks = [];
  let currentPage = 0;
  const SHOW_ALL = 'allTab';
  const SHOW_ACTIVE = 'activeTab';
  const SHOW_COMPLETED = 'completeTab';

  let filterTab = SHOW_ALL;

  const getIndexElem = (stringId) => {
    const taskIndex = taskList.findIndex((item) => item.id === Number(stringId));
    return taskIndex;
  };
  const clearCheckAll = () => {
    $('#pick-all-button').prop('checked', false);
  };
  const styleForActiveTab = (element) => {
    $('.tab').removeClass('active-tab-style');
    element.addClass('active-tab-style');
  };

  const renderPaginationButton = (btnCount) => {
    let buttonHtml = '';
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= btnCount) {
      currentPage = btnCount - 1;
    }
    for (let page = 0; page < btnCount; page += 1) {
      buttonHtml += `
        <button class="paginationButton ${(page === currentPage) ? 'activeButtonStyle' : ''}" id=${page}>
            ${page + 1}
          </button>
          `;
    }
    $('#paginationList').html(buttonHtml);
  };

  const activeTaskHolder = () => {
    const activeTasks = taskList.filter((element) => element.status === false);
    const checkboxStatus = activeTasks.length === 0;
    $('#pick-all-button').prop('checked', checkboxStatus);
    if (activeTasks.length > 0) {
      $('.pick-all-button').attr('style', 'opacity: 1;');
    }
    $('#taskCounter').html(`<span>Need do ${activeTasks.length}  ${(activeTasks.length > 1) ? 'tasks' : 'task'} </span>`);
  };

  const taskDecorate = () => {
    taskList.forEach((task) => {
      if (task.status) {
        $(`#${task.id} .task-txt`).addClass('done-task-decoration');
      } else {
        $(`#${task.id}.task-txt`).removeClass('done-task-decoration');
      }
    });
  };

  const render = (array) => {
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
  };

  const paginationRender = () => {
    const filteredTasks = taskList.filter((task) => filterTab === SHOW_ALL
    || (filterTab === SHOW_ACTIVE && task.status === false)
    || (filterTab === SHOW_COMPLETED && task.status === true));
    renderPaginationButton(Math.ceil(filteredTasks.length / 5));
    const sliceStart = (currentPage) * 5;
    const end = sliceStart + 5;
    const arrayForPaginationRender = filteredTasks.slice(sliceStart, end);
    render(arrayForPaginationRender);
  };

  $(document).on('click', '#add-task-button', () => {
    clearCheckAll();
    const tabKiller = $('#new-task-text').val();
    let taskText = tabKiller.trim();
    // eslint-disable-next-line no-undef
    taskText = _.escape(taskText);
    if (taskText.length !== 0) {
      const idTemp = Date.now();
      const taskObject = {
        text: taskText,
        id: idTemp,
        status: false,
      };
      taskList.push(taskObject);
      currentPage = Math.ceil(taskList.length / 5);
      $('#all-tasks').trigger('click');
      paginationRender();
    }
    $('#new-task-text').val('');
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
    taskText = _.escape(taskText);
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
        taskText = _.escape(taskText);
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
    console.log(this.id);
    if (taskList.length === 0) {
      $('#to-do-list').append('<span class=all-task-done-alert> Hurry to add new tasks to your to-do list! </span>');
    }
    paginationRender();
  });
});
