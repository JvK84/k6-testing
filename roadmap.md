# 🗺️ Roadmap para Dominar K6 (de 0 a Experto)

## 🟢 1. Fundamentos de K6 (Nivel básico)

### 🎯 Objetivo

Comprender qué es K6, cómo se ejecutan los scripts y cómo medir rendimiento.

### 📘 Aprende

* ¿Qué es K6 y por qué usarlo?
* Instalación
* Tu primer test de carga

### 📚 Recursos

* [K6 Documentation - Getting Started](https://k6.io/docs/get-started/)
* [K6 Cheatsheet oficial](https://k6.io/docs/test-authoring/cheat-sheet/)
* Curso gratis oficial: [K6 Learn - Getting Started](https://k6.io/learn)

### 🧪 Ejercicio práctico

```js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, { 'status was 200': (r) => r.status === 200 });
}
```

```bash
k6 run script.js
```

---

## 🟡 2. Test Authoring Avanzado (Nivel intermedio)

### 🎯 Objetivo

Escribir pruebas más realistas y controlar el comportamiento del test.

### 📘 Aprende

* Grupos (`group`)
* Escenarios (`scenarios`)
* Configuración de VUs y rampas
* Checks y thresholds
* Variables de entorno

### 📚 Recursos

* [Concepts: VUs and Iterations](https://k6.io/docs/using-k6/scenarios/executors/)
* [Checks and Thresholds](https://k6.io/docs/using-k6/checks/)
* [Options and configuration](https://k6.io/docs/using-k6/options/)

### 🧪 Ejercicio práctico

```js
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

---

## 🟠 3. Carga Avanzada: Escenarios y Ramp-up

### 🎯 Objetivo

Controlar cómo se comporta el tráfico y simular cargas realistas.

### 📘 Aprende

* `stages` vs `scenarios`
* Ejecutores: `constant-vus`, `ramping-vus`, `externally-controlled`, etc.
* Load profiles

### 📚 Recursos

* [Using Scenarios](https://k6.io/docs/using-k6/scenarios/)
* [Executors explained](https://k6.io/docs/using-k6/scenarios/executors/)
* [K6 Cloud intro](https://k6.io/cloud/)

### 🧪 Ejercicio práctico

```js
export let options = {
  scenarios: {
    ramping_users: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};
```

---

## 🔵 4. Modularización, Datos y CI/CD

### 🎯 Objetivo

Automatizar pruebas y organizarlas profesionalmente.

### 📘 Aprende

* Modularización de scripts (dividir en `lib`)
* Carga de datos (`open`, CSV, JSON)
* Variables por entorno
* Integración en CI/CD (GitHub Actions, Jenkins, GitLab)

### 📚 Recursos

* [Modularization](https://k6.io/docs/using-k6/modules/)
* [Data parameterization](https://k6.io/docs/using-k6/data-parameterization/)
* [CI/CD guides](https://k6.io/docs/integrations/)

### 🧪 Ejercicio práctico

```js
import users from './users.json';

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];
  const res = http.post('https://api.test.com/login', JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'login succeeded': (r) => r.status === 200 });
}
```

---

## 🔴 5. Análisis, Observabilidad y Extensiones

### 🎯 Objetivo

Profundizar en análisis de resultados, alertas y métricas.

### 📘 Aprende

* Salida de métricas (`json`, `influxdb`, `Prometheus`)
* Uso con Grafana y dashboards
* Extensiones con `xk6`

### 📚 Recursos

* [Output metrics](https://k6.io/docs/results-output/)
* [InfluxDB + Grafana setup](https://k6.io/docs/results-output/influxdb/)
* [xk6](https://github.com/grafana/xk6)

### 🧪 Ejercicio práctico

```bash
k6 run --out json=results.json script.js
```

```bash
k6 run --out influxdb=http://localhost:8086/k6 script.js
```

---

## 🎓 Nivel Experto Completo

* Crear una suite de regresión con K6 y ejecutarla vía CI/CD
* Simular tráfico geolocalizado con proxies o contenedores
* Crear tus propias métricas personalizadas (`Trend`, `Counter`)
* Contribuir a `xk6` con extensiones

---

## 🚀 Siguientes pasos

1. ✅ Instala K6: `brew install k6` o `choco install k6`
2. ✅ Crea una carpeta `/tests/performance` en tu proyecto
3. ✅ Empieza con un test básico y evoluciona según el roadmap
4. 🔁 Conecta tus tests con tus endpoints reales (REST o GraphQL)
5. 🧪 Automatiza en tus pipelines

---
