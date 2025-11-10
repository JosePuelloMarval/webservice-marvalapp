git pull
podman build -t image-webservice:1.0.0 .
podman stop webservice-container
podman rm webservice-container
podman run -d --name webservice-container -p 5000:5000 image-webservice:1.0.0
podman ps