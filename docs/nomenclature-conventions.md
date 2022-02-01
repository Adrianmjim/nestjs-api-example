# Nomenclature conventions

Consider [architecture notes](./architecture.md) as reference

Different pieces have different nomenclature conventions:

- **Adapter implementation**: [responsability][integration]Adapter. Example: SurveyFindTypeOrmAdapter.
- **Adapter interfaces**: [responsability]Adapter. Example: SurveyFindAdapter.
- **Commands**: `[multiple]?[resource][commandtype]Command`. Example: SurveyInsertCommand, ManyUserUpdateCommand.
- **Command handlers**: `[multiple]?[resource][commandtype]CommandHandler`. Example SurveyInsertCommandHandler, ManyUserUpdateCommandHandler.
- **Converters**: `[inputModel]To[outputModel]Converter`. Example: SurveyInsertCommandToSurveyInsertQueryTypeOrmConverter.
- **Managers**: InsertSurveyManager.
- **Queries**: `[multiple]?[resource][commandtype]Query[integration]?`. Example: SurveyFindQuery, ManyUserFindQuery, SurveyFindQueryTypeOrm
- **Query handlers**: `[multiple]?[resource][commandtype]QueryHandler`. Example: SurveyFindQueryHandler, ManyUserFindQueryHandler.
