FROM python:3

ARG http_proxy
ARG https_proxy

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN apt-get update
RUN apt install -y vim

RUN python3 -m venv $VIRTUAL_ENV

COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i -e 's/\r$//' /usr/local/bin/docker-entrypoint.sh

WORKDIR /app

COPY requirements.txt .

# install wheel becouse pip hide this
RUN pip install wheel
RUN pip install -r requirements.txt

# ENTRYPOINT ["docker-entrypoint.sh"]
# CMD ["/bin/bash" , "docker-entrypoint.sh"]
# CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["tail", "-f", "/dev/null"]