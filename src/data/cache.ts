import EventEmitter from '@src/util/event.emitter';
import type HighlightSource from '@src/model/source';
import { ERROR } from '@src/types';

class Cache extends EventEmitter {
    private _data: Map<string, HighlightSource> = new Map();

    get data() {
        return this.getAll();
    }

    set data(map) {
        throw ERROR.CACHE_SET_ERROR;
    }

    save(source: HighlightSource | HighlightSource[]): void {
        if (!Array.isArray(source)) {
            this._data.set(source.id, source);

            return;
        }

        source.forEach(s => this._data.set(s.id, s));
    }

    get(id: string): HighlightSource {
        return this._data.get(id);
    }

    remove(id: string): void {
        this._data.delete(id);
    }

    getAll(): HighlightSource[] {
        const list: HighlightSource[] = [];

        this._data.forEach(source => list.push(source));

        return list;
    }

    removeAll(): string[] {
        const ids: string[] = [];

        this._data.forEach((_source, id) => ids.push(id));
        this._data.clear();

        return ids;
    }
}

export default Cache;
