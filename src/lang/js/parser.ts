// import * as calcium from '../../api/index'
// import * as idx from './indexes'
// import * as kwd from './keywords'

// export class Parser implements calcium.Parser {
//   readExpr(elem: calcium.Element): calcium.Expression {
//     if (Array.isArray(elem)) {
//       if (Array.isArray(elem[0])) {
//         // an array literal
//         const array: calcium.Expression[] = []
//         return elem[0].map((e) => this.readExpr(e))
//       } else {
//         const keyword = elem[idx.Reference.Keyword] as string
//         if (
//           keyword === kwd.Reference.Variable ||
//           keyword === kwd.Reference.Property ||
//           keyword === kwd.Reference.Subscript
//         ) {
//           return this.readRef(elem)
//         } else if (keyword === kwd.Expression.Call) {
//           const ref = this.readRef(elem[Idx.Call.FuncRef] as Elem.Reference)
//           const args = this.readArgs(elem[Idx.Call.Args] as Elem.Any[])
//           return new Expr.Call(ref, args)
//         } else if (keyword === kwd.Expression.New) {
//           const klass = this.readRef(elem[Idx.New.Class] as Elem.Reference)
//           const args = this.readArgs(elem[Idx.New.Args] as Elem.Any[])
//           return new Expr.New(klass, args)
//         } else if (elem.length >= 3) {
//           return this.readBinOp(keyword, elem)
//         } else if (elem.length >= 2) {
//           return this.readUnOp(keyword, elem)
//         }
//       }
//     } else {
//       return elem
//     }
//     throw new Error('Not implemented')
//   }

//   readRef(elem: calcium.Element): calcium.Operation {
//     const kw = elem[idx.Expression.Keyword]
//     if (kw === Kw.Reference.Variable) {
//       return new Expr.Variable(elem[idx.Variable.Name] as string)
//     } else if (kw === Kw.Reference.Property) {
//       const ref = this.readRef(elem[idx.Property.ReferredObj])
//       const propertyName = elem[idx.Property.PropertyName]
//       return new Expr.Property(ref, propertyName)
//     } else if (kw === Kw.Reference.Subscript) {
//       const referredObj = this.readRef(
//         elem[idx.Subscript.ReferredObj] as Elem.Reference
//       )
//       const index = this.readExpr(elem[Idx.Subscript.IndexExpr] as Elem.Any)
//       return new Expr.Subscript(referredObj, index)
//     } else {
//       throw new Error('Not implemented')
//     }
//   }
// }
