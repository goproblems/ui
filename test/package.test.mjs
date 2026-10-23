import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import test from 'node:test';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Article, ArticleBody, ArticleHeader, ArticleMeta, ArticleTitle, Button, Card, CardBody, CardHeader, Form, FormCheck, FormControl, FormSelect, Modal, Spinner, Tab, UiProvider} from '@goproblems/ui';
import {ArrowRight} from '@goproblems/ui/icons';

test('published ESM renders components and icons without application providers', () => {
    const html = renderToStaticMarkup(h(Card, null, h(Button, {variant: 'primary'}, h(ArrowRight, {size: 16}), 'Continue')));
    assert.match(html, /data-ui="card"/);
    assert.match(html, /type="button"/);
    assert.match(html, /<svg/);
    assert.match(html, /Continue/);
});

test('accessibility labels can be supplied by any localization system', () => {
    const html = renderToStaticMarkup(h(UiProvider, {labels: {close: '关闭', loading: '加载中'}},
        h(Spinner), h(Modal, {show: true}, h(Modal.Header, {closeButton: true}, 'Title'))));
    assert.match(html, /aria-label="加载中"/);
    assert.match(html, /aria-label="关闭"/);
});

test('compound and standalone components share the same implementation', () => {
    assert.equal(Article.Body, ArticleBody);
    assert.equal(Article.Header, ArticleHeader);
    assert.equal(Article.Title, ArticleTitle);
    assert.equal(Article.Meta, ArticleMeta);
    assert.equal(Card.Body, CardBody);
    assert.equal(Card.Header, CardHeader);
    assert.equal(Form.Check, FormCheck);
    assert.equal(Form.Control, FormControl);
    assert.equal(Form.Select, FormSelect);
});

test('published article entry renders content and metadata without application providers', () => {
    const html = renderToStaticMarkup(h(Article, null,
        h(Article.Header, null, h(Article.Title, null, 'Guide')),
        h(Article.Body, {dangerouslySetInnerHTML: {__html: '<p>Article content</p>'}}),
        h(Article.Meta, null, h('time', {dateTime: '2026-10-23'}, 'October 23, 2026'))));
    assert.match(html, /<article[^>]*data-ui="article"/);
    assert.match(html, /<h1 class="ui-article-title">Guide<\/h1>/);
    assert.match(html, /class="ui-article-body"><p>Article content<\/p>/);
    assert.match(html, /<footer class="ui-article-meta"><time dateTime="2026-10-23">/);
});

test('tab state and forwarded footer attributes survive rendering', () => {
    const html = renderToStaticMarkup(h(Tab.Container, {defaultActiveKey: 'first'},
        h(Tab.Pane, {eventKey: 'first'}, 'Visible'), h(Tab.Pane, {eventKey: 'second'}, 'Hidden'),
        h(Card.Footer, {'data-ui': 'custom-footer'}, 'Footer')));
    assert.match(html, /hidden="" class="hidden">Hidden/);
    assert.match(html, /data-ui="custom-footer"/);
});

test('published styles scan the shipped JavaScript and include the theme', () => {
    const styles = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');
    assert.match(styles, /@source .*js/);
    assert.match(styles, /@import "\.\/theme\.css"/);
    assert.equal(existsSync(new URL('../dist/theme.css', import.meta.url)), true);
    assert.equal(existsSync(new URL('../dist/Button.js', import.meta.url)), true);
    for (const className of ['ui-article', 'ui-article-header', 'ui-article-title', 'ui-article-body', 'ui-article-meta']) {
        assert.ok(styles.includes(`.${className} {`), `Published styles must include ${className}`);
    }
});
