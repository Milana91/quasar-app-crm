const ERROR_CODES = {
    'auth/wrong-password': 'Пароль неверный',
    'auth/id-token-expired': 'Пожалуйста, войдите в систему',
    'auth/user-not-found': 'Неверный email',
    'auth/internal-error': 'Отсутствует связь с сервером',
     auth: 'Пожалуйста, войдите в систему',
    'auth/invalid-email': 'Неверный почтовый адрес',
    'auth/too-many-requests': 'Cлишком много попыток. Повторите позже',
    'ReferenceError: user is not defined': 'Пользователь не определен',
}

export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}