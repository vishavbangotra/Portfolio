---
title: MiniProxy
label: Side project · In progress
description: A reverse proxy written from first principles in Java.
lede: >-
  A reverse proxy written from first principles in Java — to understand what
  sits between a client and a fleet of servers.
# Facts with an empty value are hidden.
facts:
  - label: Stack
    value: Java 11+ · Spring Boot · Maven
  - label: Around it
    value: Docker · Prometheus · Grafana
  - label: Started
    value: "" # TODO: e.g. "Aug 2026"
  - label: Source
    value: "" # TODO: e.g. "github.com/vishavbangotra/miniproxy"
    href: "" # TODO: e.g. "https://github.com/vishavbangotra/miniproxy"
# status: done | now | next
log:
  - status: done
    text: Forward proxy over the JDK's HTTP server
  - status: done
    text: Thread-safe round-robin load balancing
  - status: now
    text: Health checks — stop sending traffic to a server that has gone quiet
  - status: next
    text: Sliding-window rate limiting
  - status: next
    text: Circuit breaking
  - status: next
    text: An LRU cache with TTLs, written from scratch
options:
  - title: Docker Compose
    text: Proxy, Redis and the metrics stack as containers. Closer to how it would run in production.
  - title: One self-contained binary
    text: No Redis. An in-memory LRU + TTL cache, written by hand. Harder, and more to learn.
---

## Why build it

Most of my day is spent integrating services. I wanted to build the thing that sits in front of them — the part that decides where a request goes, what happens when a server is slow, and when to stop trying. Frameworks hide those decisions. Writing them by hand is the only way I know to understand them.

## What works today

A forward proxy on `com.sun.net.httpserver`, a constructor-injected load balancer, and round-robin selection that stays correct under concurrent requests. The whole trick is one atomic counter and a modulo that never goes negative.

```java
private final AtomicInteger next = new AtomicInteger();

Backend pick() {
    List<Backend> live = List.copyOf(backends);
    int i = Math.floorMod(next.getAndIncrement(), live.size());
    return live.get(i);
}
```

floorMod, not %, because the counter will overflow eventually and wrap to a negative number.
{: .caption}

## The log

{% include case-log.html %}

## An open decision

The project started as “a single binary”. Then Redis, Prometheus and Grafana crept in. Both directions are honest; they teach different things.

{% include case-options.html %}

## Benchmarks

<div class="empty-box">
  <p class="lede">Nothing measured yet.</p>
  <p class="small">When the numbers come, they'll come with the reason they look the way they do.</p>
</div>
