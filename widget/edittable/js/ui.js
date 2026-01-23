/**
<<<<<<< HEAD
 * Модуль пользовательского интерфейса для редактируемой таблицы
 *
 * Этот модуль управляет отображением интерфейса, включая таблицу,
 * настройки и обработку пользовательских взаимодействий.
=======
 * Модуль для работы с пользовательским интерфейсом
 *
 * Этот модуль отвечает за отображение данных в виде таблицы,
 * обработку событий и взаимодействие с пользователем.
>>>>>>> origin/main
 *
 * @module UIModule
 */

<<<<<<< HEAD
var UIModule = (function() {
=======
var UIModule = (function(GristApiModule, TableModule, ConfigModule) {
>>>>>>> origin/main
  'use strict';

  // ========================================
  // ПРИВАТНЫЕ ПЕРЕМЕННЫЕ
  // ========================================

<<<<<<< HEAD
  var $tableSelect = null; // Элемент выбора таблицы
  var $table = null; // Элемент таблицы
  var $tableHeader = null; // Заголовок таблицы
  var $tableBody = null; // Тело таблицы
  var $status = null; // Элемент статуса
  var $addRecordBtn = null; // Кнопка добавления записи

  // ========================================
  // ИНИЦИАЛИЗАЦИЯ
  // ========================================

  /**
   * Инициализировать модуль UI
   */
  function initialize() {
    $tableSelect = $('#table-select');
    $table = $('#editable-table');
    $tableHeader = $('#table-header');
    $tableBody = $('#table-body');
    $status = $('#status-text');
    $addRecordBtn = $('#add-record-btn');

    // Привязываем обработчики событий
    bindEvents();

    console.log('UI модуль инициализирован');
  }

  /**
   * Привязать обработчики событий
   */
  function bindEvents() {
    $tableSelect.on('change', function() {
      var tableId = $(this).val();
      ConfigModule.setSelectedTableId(tableId);
      AppModule.loadSelectedTable();
    });

    $addRecordBtn.on('click', function() {
      addNewRecord();
    });
  }

  // ========================================
  // ОТОБРАЖЕНИЕ СПИСКА ТАБЛИЦ
  // ========================================

  /**
   * Заполнить список таблиц
   *
   * @param {Array} tables - Список таблиц
   */
  function populateTableSelect(tables) {
    $tableSelect.empty();
    $tableSelect.append($('<option>', {
      value: '',
      text: 'Выберите таблицу'
    }));

    tables.forEach(function(table) {
      $tableSelect.append($('<option>', {
        value: table.id,
        text: table.tableId
      }));
    });

    // Скрываем кнопку добавления, пока таблица не выбрана
    $addRecordBtn.hide();

    console.log('Список таблиц обновлен');
  }

  // ========================================
  // ОТОБРАЖЕНИЕ ДАННЫХ ТАБЛИЦЫ
  // ========================================

  /**
   * Отобразить данные таблицы
   *
   * @param {Object} tableData - Данные таблицы из Grist
   */
  function displayTableData(tableData) {
    clearTable();

    if (isTableEmpty(tableData)) {
      displayEmptyTable();
      return;
    }

    var fieldNames = getFieldNames(tableData);
    createTableHeaders(fieldNames);
    createTableRows(tableData, fieldNames);
    initializeTabledit(fieldNames);
    showAddButton();

    console.log('Данные таблицы отображены');
  }

  /**
   * Очистить таблицу от предыдущих данных
   */
  function clearTable() {
    $tableHeader.empty();
    $tableBody.empty();
  }

  /**
   * Проверить, пуста ли таблица
   *
   * @param {Object} tableData - Данные таблицы
   * @returns {boolean} true, если таблица пуста
   */
  function isTableEmpty(tableData) {
    return !tableData || !tableData.id || tableData.id.length === 0;
  }

  /**
   * Отобразить пустую таблицу
   */
  function displayEmptyTable() {
    $tableHeader.append('<th>Нет данных</th>');
    $tableBody.append('<tr><td>Таблица пуста</td></tr>');
  }

  /**
   * Получить список полей таблицы
   *
   * @param {Object} tableData - Данные таблицы
   * @returns {Array} Список имен полей
   */
  function getFieldNames(tableData) {
    return Object.keys(tableData).filter(function(key) {
      return key !== 'id' && key !== 'manualSort';
    });
  }

  /**
   * Создать заголовки таблицы
   *
   * @param {Array} fieldNames - Список имен полей
   */
  function createTableHeaders(fieldNames) {
    var $headerRow = $('<tr>');
    $headerRow.append('<th>ID</th>');
    fieldNames.forEach(function(fieldName) {
      $headerRow.append('<th>' + fieldName + '</th>');
    });
    $tableHeader.append($headerRow);
  }

  /**
   * Создать строки данных таблицы
   *
   * @param {Object} tableData - Данные таблицы
   * @param {Array} fieldNames - Список имен полей
   */
  function createTableRows(tableData, fieldNames) {
    for (var i = 0; i < tableData.id.length; i++) {
      var $row = createTableRow(tableData, fieldNames, i);
      $tableBody.append($row);
=======
  let tabulatorInstance = null;

  // ========================================
  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // ========================================

  /**
   * Очистить таблицу
   */
  function clearTable() {
    const container = document.getElementById('table-container');
    container.innerHTML = '';
    if (tabulatorInstance) {
      tabulatorInstance.destroy();
      tabulatorInstance = null;
>>>>>>> origin/main
    }
  }

  /**
<<<<<<< HEAD
   * Создать одну строку таблицы
   *
   * @param {Object} tableData - Данные таблицы
   * @param {Array} fieldNames - Список имен полей
   * @param {number} index - Индекс строки
   * @returns {jQuery} jQuery объект строки
   */
  function createTableRow(tableData, fieldNames, index) {
    var $row = $('<tr>');
    $row.attr('data-id', tableData.id[index]);
    $row.append('<td>' + tableData.id[index] + '</td>');

    fieldNames.forEach(function(fieldName) {
      var value = tableData[fieldName] ? tableData[fieldName][index] : '';
      $row.append('<td>' + (value || '') + '</td>');
    });

    return $row;
  }

  /**
   * Показать кнопку добавления записи
   */
  function showAddButton() {
    $addRecordBtn.show();
  }

  /**
   * Инициализировать Tabledit для редактирования таблицы
   *
   * @param {Array} fieldNames - Список имен полей
   */
  function initializeTabledit(fieldNames) {
    // Удаляем предыдущую инициализацию, если есть
    if ($table.hasClass('tabledit')) {
      $table.tabledit('destroy');
    }

    // Настраиваем колонки для редактирования (исключаем ID)
    var columns = {
      identifier: [0, 'id'], // ID колонка
      editable: []
    };

    fieldNames.forEach(function(fieldName, index) {
      columns.editable.push([index + 1, fieldName]); // +1 потому что ID колонка первая
    });

    // Инициализируем Tabledit
    $table.tabledit({
      url: '', // Не используем URL, обрабатываем изменения вручную
      columns: columns,
      onDraw: function() {
        console.log('Tabledit инициализирован');
      },
      onSuccess: function(data, textStatus, jqXHR) {
        // Обработка успешного сохранения
        console.log('Изменения сохранены:', data);
        updateStatus('Изменения сохранены');
      },
      onFail: function(jqXHR, textStatus, errorThrown) {
        console.error('Ошибка сохранения:', errorThrown);
        updateStatus('Ошибка сохранения: ' + errorThrown);
      },
      onAjax: function(action, serialize) {
        // Перехватываем AJAX запросы и обрабатываем вручную
        handleTableEdit(action, serialize);
        return false; // Предотвращаем отправку AJAX
=======
   * Показать сообщение статуса
   * @param {string} message - Сообщение
   * @param {string} type - Тип сообщения (success, error, warning, info)
   */
  function showStatusMessage(message, type) {
    const statusMessage = document.getElementById('status-message');
    let className = '';
    switch(type) {
      case 'success':
        className = 'alert alert-success';
        break;
      case 'error':
        className = 'alert alert-danger';
        break;
      case 'warning':
        className = 'alert alert-warning';
        break;
      default:
        className = 'alert alert-info';
    }
    statusMessage.innerHTML = `<div class="${className}">${message}</div>`;

    // Автоматически скрыть сообщения успеха через 3 секунды
    if (type === 'success') {
      setTimeout(() => {
        if (statusMessage.innerHTML.includes(message)) {
          statusMessage.innerHTML = '';
        }
      }, 3000);
    }
  }

  // ========================================
  // ПУБЛИЧНЫЕ МЕТОДЫ
  // ========================================

  /**
   * Инициализировать интерфейс
   */
  function initializeUI() {
    // Обработчик изменения выбора таблицы
    document.getElementById('table-select').addEventListener('change', function() {
      const selectedTableId = this.value;
      if (selectedTableId) {
        loadTableData(selectedTableId);
      } else {
        // Очистить таблицу если таблица не выбрана
        clearTable();
>>>>>>> origin/main
      }
    });
  }

  /**
<<<<<<< HEAD
   * Обработать изменения в таблице
   *
   * @param {string} action - Действие (edit, delete и т.д.)
   * @param {string} serialize - Сериализованные данные
   */
  function handleTableEdit(action, serialize) {
    console.log('Обработка изменения:', action, serialize);

    // Парсим данные
    var data = {};
    serialize.split('&').forEach(function(pair) {
      var parts = pair.split('=');
      data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    });

    var tableId = ConfigModule.getSelectedTableId();
    var recordId = parseInt(data.id);

    if (action === 'edit') {
      // Собираем изменения
      var changes = {};
      Object.keys(data).forEach(function(key) {
        if (key !== 'id' && key !== 'action') {
          changes[key] = data[key];
        }
      });

      // Сохраняем изменения
      GristAPIModule.saveRecordChanges(tableId, recordId, changes).then(function() {
        updateStatus('Изменения сохранены');
      }).catch(function(error) {
        updateStatus('Ошибка: ' + error.message);
      });

    } else if (action === 'delete') {
      // Удаляем запись
      GristAPIModule.deleteRecord(tableId, recordId).then(function() {
        updateStatus('Запись удалена');
        // Перезагружаем таблицу
        AppModule.loadSelectedTable();
      }).catch(function(error) {
        updateStatus('Ошибка: ' + error.message);
      });
=======
   * Загрузить список таблиц
   */
  async function loadTables() {
    try {
      const statusMessage = document.getElementById('status-message');
      statusMessage.innerHTML = '<div class="loading">Загрузка доступных таблиц...</div>';

      // Получить список таблиц из Grist
      const tables = await GristApiModule.loadTables();

      const tableSelect = document.getElementById('table-select');
      tableSelect.innerHTML = '<option value="">-- Выберите таблицу --</option>';

      if (tables && tables.id && Array.isArray(tables.id)) {
        for (let i = 0; i < tables.id.length; i++) {
          const id = tables.id[i];
          const name = tables.tableId[i] || 'N/A';

          // Пропустить внутренние таблицы Grist
          if (!name.startsWith('_grist')) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            tableSelect.appendChild(option);
          }
        }
      }

      statusMessage.innerHTML = '';
    } catch (error) {
      console.error('Ошибка загрузки таблиц:', error);
      const statusMessage = document.getElementById('status-message');
      statusMessage.innerHTML = `
        <div class="alert alert-danger">
          <strong>Ошибка загрузки таблиц:</strong> ${error.message}
        </div>
      `;
>>>>>>> origin/main
    }
  }

  /**
<<<<<<< HEAD
   * Добавить новую запись
   */
  function addNewRecord() {
    var tableId = ConfigModule.getSelectedTableId();
    if (!tableId) {
      updateStatus('Сначала выберите таблицу');
      return;
    }

    // Получаем текущие данные для определения полей
    var currentData = GristAPIModule.getCurrentTableData();
    if (!currentData) {
      updateStatus('Нет данных таблицы');
      return;
    }

    // Получаем список полей
    var fieldNames = Object.keys(currentData).filter(function(key) {
      return key !== 'id' && key !== 'manualSort';
    });

    // Создаем объект с пустыми значениями
    var newRecord = {};
    fieldNames.forEach(function(field) {
      newRecord[field] = '';
    });

    // Добавляем запись
    GristAPIModule.addNewRecord(tableId, newRecord).then(function() {
      updateStatus('Новая запись добавлена');
      // Перезагружаем таблицу
      AppModule.loadSelectedTable();
    }).catch(function(error) {
      updateStatus('Ошибка добавления записи: ' + error.message);
    });
  }

  // ========================================
  // СТАТУС И СООБЩЕНИЯ
  // ========================================

  /**
   * Обновить статус
   *
   * @param {string} message - Сообщение статуса
   */
  function updateStatus(message) {
    if ($status) {
      $status.text(message);
      // Автоматически скрываем статус через 3 секунды
      setTimeout(function() {
        $status.text('');
      }, 3000);
    }
  }

  /**
   * Показать сообщение об ошибке
   *
   * @param {string} message - Сообщение об ошибке
   */
  function showError(message) {
    updateStatus('Ошибка: ' + message);
    console.error(message);
  }

  /**
   * Показать сообщение о загрузке
   *
   * @param {string} message - Сообщение о загрузке
   */
  function showLoading(message) {
    updateStatus(message || 'Загрузка...');
  }

=======
   * Загрузить данные таблицы
   * @param {string} tableId - ID таблицы
   */
  async function loadTableData(tableId) {
    try {
      TableModule.setCurrentTableId(tableId);
      const statusMessage = document.getElementById('status-message');
      statusMessage.innerHTML = '<div class="loading">Загрузка данных таблицы...</div>';

      // Загрузить данные выбранной таблицы
      const tableData = await GristApiModule.loadTableData(tableId);

      if (!tableData || !tableData.id || !Array.isArray(tableData.id)) {
        statusMessage.innerHTML = `
          <div class="alert alert-warning">
            Выбранная таблица пуста или не содержит данных
          </div>
        `;
        clearTable();
        return;
      }

      // Преобразовать данные таблицы
      const { records, columns } = TableModule.transformTableData(tableData);

      // Сохранить текущие записи и колонки
      TableModule.setCurrentRecords(records);
      TableModule.setCurrentColumns(columns);

      // Отобразить редактируемую таблицу
      renderEditableTable();

      statusMessage.innerHTML = `
        <div class="alert alert-success">
          Загружено ${records.length} записей из таблицы "${tableId}"
        </div>
      `;
    } catch (error) {
      console.error('Ошибка загрузки данных таблицы:', error);
      const statusMessage = document.getElementById('status-message');
      statusMessage.innerHTML = `
        <div class="alert alert-danger">
          <strong>Ошибка загрузки данных таблицы:</strong> ${error.message}
        </div>
      `;
    }
  }

  /**
   * Отобразить редактируемую таблицу
   */
  function renderEditableTable() {
    // Очистить предыдущую таблицу если существует
    clearTable();

    // Подготовить колонки для Tabulator
    const tabulatorColumns = TableModule.getCurrentColumns().map(col => {
      return {
        title: col,
        field: col,
        editor: "input", // Редактор текстового поля
        headerTooltip: true,
        validator: ["required"] // Можно добавить валидаторы по необходимости
      };
    });

    // Создать таблицу с помощью Tabulator
    tabulatorInstance = new Tabulator("#table-container", {
      data: TableModule.getCurrentRecords(), // Передаем прямые данные
      columns: tabulatorColumns,
      height: "600px", // Устанавливаем высоту таблицы
      layout: "fitColumns", // Автоподгонка ширины колонок
      movableColumns: true, // Возможность перемещать колонки
      responsiveLayout: "hide", // Адаптивный дизайн
      tooltips: true, // Подсказки при наведении
      addRowPos: "top", // Позиция добавления новой строки
      history: true, // Включить историю изменений
      pagination: true, // Включить пагинацию
      paginationSize: ConfigModule.getConfigValue('pageSize'),
      paginationCounter: "rows", // Показывать счетчик строк
      movableRows: true, // Возможность перемещать строки
      rowClick: function(e, row) {
        // Обработка клика по строке
        console.log("Строка кликнута:", row.getData());
      },
      cellEdited: function(cell) {
        // Обработка редактирования ячейки
        const field = cell.getField(); // Название поля
        const newValue = cell.getValue(); // Новое значение
        const rowData = cell.getRow().getData(); // Данные всей строки
        const rowId = rowData.id; // ID строки из Grist

        // Обновить запись в Grist
        updateRecordInGrist(rowId, field, newValue);
      }
    });
  }

  /**
   * Обновить запись в Grist
   * @param {number} rowId - ID строки
   * @param {string} fieldName - Название поля
   * @param {*} newValue - Новое значение
   */
  async function updateRecordInGrist(rowId, fieldName, newValue) {
    try {
      // Подготовить объект обновления
      const updateObj = {};
      updateObj[fieldName] = newValue;

      // Обновить запись в Grist
      await GristApiModule.updateRecord(
        TableModule.getCurrentTableId(),
        rowId,
        updateObj
      );

      // Найти и обновить локальную запись
      TableModule.updateLocalRecord(rowId, fieldName, newValue);

      // Показать сообщение об успехе
      showStatusMessage(`Обновлено ${fieldName} для записи ID ${rowId}`, 'success');
    } catch (error) {
      console.error('Ошибка обновления записи:', error);
      showStatusMessage(`Ошибка обновления записи: ${error.message}`, 'error');
    }
  }

>>>>>>> origin/main
  // ========================================
  // ЭКСПОРТ ПУБЛИЧНОГО API
  // ========================================

  return {
<<<<<<< HEAD
    initialize: initialize,
    populateTableSelect: populateTableSelect,
    displayTableData: displayTableData,
    updateStatus: updateStatus,
    showError: showError,
    showLoading: showLoading
  };
})();
=======
    initializeUI: initializeUI,
    loadTables: loadTables,
    loadTableData: loadTableData,
    renderEditableTable: renderEditableTable,
    showStatusMessage: showStatusMessage,
    clearTable: clearTable
  };
})(GristApiModule, TableModule, ConfigModule);
>>>>>>> origin/main
