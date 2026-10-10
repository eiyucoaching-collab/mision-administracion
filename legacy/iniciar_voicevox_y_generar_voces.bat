@echo off
echo Arrancando VOICEVOX engine...
start /B "" "voicevox\VOICEVOX\vv-engine\run.exe" --host 127.0.0.1 --port 50021
echo Esperando 25 segundos para que VOICEVOX cargue los modelos...
timeout /t 25 /nobreak > NUL
echo Verificando conexion...
curl -s http://127.0.0.1:50021/version
echo.
echo Generando voces de anime con VOICEVOX...
set PYTHONIOENCODING=utf-8
python generate_voicevox_voices.py
echo.
echo Proceso completado. Presiona una tecla para cerrar.
pause
