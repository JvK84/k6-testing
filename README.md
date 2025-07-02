# k6 Performance Tests

Este proyecto está diseñado para practicar pruebas de performance utilizando [k6](https://k6.io/).

## ¿Qué es k6?
k6 es una herramienta de código abierto para pruebas de carga y rendimiento, ideal para desarrolladores y testers que desean validar la robustez y escalabilidad de sus sistemas.

## Instalación

### Linux (Debian/Ubuntu)
```sh
sudo apt update && sudo apt install -y gnupg2
curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update && sudo apt install k6
```

### O usando Homebrew
```sh
brew install k6
```

### O usando Docker
```sh
docker run -i grafana/k6 run - <script.js
```

## Estructura del proyecto
- `scripts/`: Aquí van los scripts de prueba en JavaScript.
- `.github/`: Instrucciones para Copilot.
- `.vscode/`: Configuración de tareas para VS Code.

## Ejemplo de script de prueba (`scripts/example.js`)
```js
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10, // usuarios virtuales
  duration: '30s',
};

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
```

## Cómo ejecutar una prueba

1. Coloca tus scripts en la carpeta `scripts/`.
2. Ejecuta:
   ```sh
   k6 run scripts/example.js
   ```

## Recursos útiles
- [Documentación oficial de k6](https://k6.io/docs/)
- [Ejemplos de scripts](https://k6.io/docs/examples/)

---
¡Feliz testing!
