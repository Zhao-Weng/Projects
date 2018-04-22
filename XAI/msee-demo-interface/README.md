# MSEE Demo Interface

## Dependencies

- Flask
- msee-sdk (for RPC with query engine)

## Run (Python)

Get data files:
```bash
bash sync_data.sh
bash dl_data.sh
```

Run:
```bash
python demo.py
```

## VTT Server (Nginx)

Root: `~/Sites/vtt/demo/MSEE-Demo-Interface`

Restart Gunicorn service (this will create `demo.sock`):
```bash
sudo restart gunicorn_vtt
```

Gunicorn service config: `/etc/init/gunicorn_vtt.conf`

```
description "Gunicorn vtt"

start on runlevel [2345]
stop on runlevel [!2345]

respawn
setuid vcla
setgid www-data

chdir /home/vcla/Sites/vtt/demo/MSEE-Demo-Interface/
exec gunicorn --pythonpath '/home/vcla/Sites/vtt/demo/msee-sdk/py/' -w 4 -b unix:demo.sock -m 007 demo:app
```

Nginx config:
```nginx
server {
        listen 80;

        server_name demo.visualturingtest.org;

        location / {
                auth_basic "";
                auth_basic_user_file /etc/nginx/.htpasswd;
                include proxy_params;
                proxy_pass http://unix:/home/vcla/Sites/vtt/demo/MSEE-Demo-Interface/demo.sock:/;
        }

        location /api/ {
                include proxy_params;
                proxy_pass http://unix:/home/vcla/Sites/vtt/demo/MSEE-Demo-Interface/demo.sock:/api/;
        }

        location /assets/ {
                root /home/vcla/Sites/vtt/demo/;
        }

        location /static/ {
                root /home/vcla/Sites/vtt/demo/MSEE-Demo-Interface/;
        }
}
```
