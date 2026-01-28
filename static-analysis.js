// Статический анализ функций модуля data.js
// Проверка логики функций без запуска в браузере

console.log('🔍 Статический анализ функций модуля DataModule');

// Имитация grist API для теста
const mockGrist = {
    docApi: {
        fetchTable: async function(tableName) {
            console.log(`📡 Вызов fetchTable для: ${tableName}`);
            if (tableName === 'nonexistent') {
                const error = new Error('KeyError: \'schema\'');
                throw error;
            }
            if (tableName === 'empty') {
                throw new Error('KeyError: \'schema\'');
            }
            return {
                id: [1, 2, 3],
                feeder_name: ['F1', 'F1', 'F2'],
                feeder_row: [1, 1, 1],
                feeder_col: [1, 2, 1],
                type: ['АВ', 'АВДТ', 'АВ'],
                brand: [' Schneider', ' ABB', ' Legrand']
            };
        },
        listTables: async function() {
            console.log('📋 Вызов listTables');
            return [
                { id: 'Table1', name: 'Table1' },
                { id: 'schema', name: 'Schema' },
                { id: 'Data', name: 'Data' }
            ];
        }
    }
};

// Глобальная переменная для тестов
global.grist = mockGrist;

// Загрузим и проанализируем код
const fs = require('fs');

try {
    const dataCode = fs.readFileSync('./widget/onelineschema/js/data.js', 'utf8');
    console.log('✅ Файл data.js успешно прочитан');
    
    // Проверим наличие ключевых функций
    const hasCheckTableExists = dataCode.includes('function checkTableExists');
    const hasGetAvailableTables = dataCode.includes('function getAvailableTables');
    const hasLoadData = dataCode.includes('function loadData');
    const hasErrorHandling = dataCode.includes('checkTableExists(tableName)');
    const hasKeyErrorCheck = dataCode.includes('KeyError');
    
    console.log('\n📊 Анализ наличия функций:');
    console.log(`  checkTableExists: ${hasCheckTableExists ? '✅' : '❌'}`);
    console.log(`  getAvailableTables: ${hasGetAvailableTables ? '✅' : '❌'}`);
    console.log(`  loadData: ${hasLoadData ? '✅' : '❌'}`);
    console.log(`  Обработка ошибок: ${hasErrorHandling ? '✅' : '❌'}`);
    console.log(`  Проверка KeyError: ${hasKeyErrorCheck ? '✅' : '❌'}`);
    
    // Проверим экспорт функций
    const exportSection = dataCode.substring(dataCode.lastIndexOf('return {'));
    const exportsCheck = [
        { name: 'checkTableExists', present: exportSection.includes('checkTableExists') },
        { name: 'getAvailableTables', present: exportSection.includes('getAvailableTables') },
        { name: 'loadData', present: exportSection.includes('loadData') }
    ];
    
    console.log('\n📤 Анализ экспорта функций:');
    exportsCheck.forEach(exp => {
        console.log(`  ${exp.name}: ${exp.present ? '✅' : '❌'}`);
    });
    
    // Анализ логики обработки ошибок
    console.log('\n🔧 Анализ обработки ошибок:');
    
    if (dataCode.includes('if (!tableName)')) {
        console.log('  ✅ Проверка на пустое имя таблицы');
    } else {
        console.log('  ❌ Отсутствует проверка на пустое имя таблицы');
    }
    
    if (dataCode.includes('const tableExists = await checkTableExists(tableName)')) {
        console.log('  ✅ Вызов проверки существования таблицы');
    } else {
        console.log('  ❌ Отсутствует вызов проверки существования таблицы');
    }
    
    if (dataCode.includes('if (!tableExists)')) {
        console.log('  ✅ Обработка случая несуществующей таблицы');
    } else {
        console.log('  ❌ Отсутствует обработка несуществующей таблицы');
    }
    
    if (dataCode.includes('getAvailableTables()')) {
        console.log('  ✅ Получение списка доступных таблиц при ошибке');
    } else {
        console.log('  ❌ Отсутствует получение списка таблиц при ошибке');
    }
    
    console.log('\n🎯 Итоговый анализ:');
    const allChecksPass = [
        hasCheckTableExists,
        hasGetAvailableTables,
        hasLoadData,
        hasErrorHandling,
        hasKeyErrorCheck,
        ...exportsCheck.map(e => e.present)
    ].every(Boolean);
    
    if (allChecksPass) {
        console.log('  ✅ Все необходимые функции присутствуют и корректно экспортированы');
    } else {
        console.log('  ❌ Обнаружены проблемы с функциями или экспортом');
    }
    
} catch (error) {
    console.error('❌ Ошибка при анализе файла:', error.message);
}

// Анализ других модулей
try {
    console.log('\n🔍 Анализ модуля config.js');
    const configCode = fs.readFileSync('./widget/onelineschema/js/config.js', 'utf8');
    
    const hasTableField = configCode.includes('table: DEFAULT_TABLE');
    const hasTableDefault = configCode.includes("var DEFAULT_TABLE = 'schema'");
    const allowsTableConfig = !configCode.includes('fieldName !== \'table\'');
    
    console.log(`  Поле table в конфигурации: ${hasTableField ? '✅' : '❌'}`);
    console.log(`  Значение по умолчанию 'schema': ${hasTableDefault ? '✅' : '❌'}`);
    console.log(`  Разрешена настройка table: ${allowsTableConfig ? '✅' : '❌'}`);
    
} catch (error) {
    console.error('❌ Ошибка при анализе config.js:', error.message);
}

try {
    console.log('\n🔍 Анализ модуля app.js');
    const appCode = fs.readFileSync('./widget/onelineschema/js/app.js', 'utf8');
    
    const usesTableNameFromConfig = appCode.includes('getTableName()');
    const hasErrorHandling = appCode.includes('error.message.includes(\'не найдена\')');
    const showsAvailableTables = appCode.includes('getAvailableTables()');
    
    console.log(`  Использует имя таблицы из конфига: ${usesTableNameFromConfig ? '✅' : '❌'}`);
    console.log(`  Обработка ошибки несуществующей таблицы: ${hasErrorHandling ? '✅' : '❌'}`);
    console.log(`  Показ доступных таблиц: ${showsAvailableTables ? '✅' : '❌'}`);
    
} catch (error) {
    console.error('❌ Ошибка при анализе app.js:', error.message);
}

console.log('\n🏁 Анализ завершен');