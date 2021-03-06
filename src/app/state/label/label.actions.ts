import { Label } from "../../services/resources/label.resource";

export class UpdateLabels {
  static readonly type = '[Labels] Update Labels';
  constructor() {}
}

export class UpdateLabel {
  static readonly type = '[Labels] Update Label';
  constructor(public label: Label) {}
}

export class AddLabel {
  static readonly type = '[Labels] Add Label';
  constructor(public label: Label) {}
}

export class RemoveLabel {
  static readonly type = '[Labels] Remove Label';
  constructor(public label: Label) {}
}
