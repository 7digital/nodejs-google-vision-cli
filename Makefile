IMAGE=callas.jpg
TYPE=LOGO_DETECTION
LIMIT=1

run:
	docker run --rm \
	-e GOOGLE_API_KEY=$(GOOGLE_API_KEY) \
	-v `pwd`:/src -w /src \
	mhart/alpine-node:4.2 \
	node index.js --image $(IMAGE) --type $(TYPE) --limit $(LIMIT)
