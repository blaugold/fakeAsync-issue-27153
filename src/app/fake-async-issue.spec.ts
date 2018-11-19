import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('fakeAsync issue', () => {

  /**
   * Logs:
   * '// Schedule microtask'
   * '// Attach then callback'
   * '// Exit test'
   * 'foo'
   */
  it('should fail because pending microtask has not been flushed', fakeAsync(() => {
    console.log(`// Schedule microtask`);
    const prom = Promise.resolve('foo');

    console.log(`// Attach then callback`);
    prom.then(console.log);

    console.log(`// Exit test`);
  }));

  /**
   * Logs:
   * '// Schedule microtask'
   * '// Attach then callback'
   * '// Flush microtasks'
   * 'foo'
   * '// Exit test'
   */
  it('should pass because pending microtask has been flushed', fakeAsync(() => {
    console.log(`// Schedule microtask`);
    const prom = Promise.resolve('foo');

    console.log(`// Attach then callback`);
    prom.then(console.log);

    console.log('// Flush microtasks');
    flushMicrotasks();

    console.log(`// Exit test`);
  }));

});
